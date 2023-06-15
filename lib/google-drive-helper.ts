import { drive_v3 } from "@googleapis/drive";
import { google } from "googleapis";
import { url } from "inspector";
import DocumentsHelper from "./documents-helper";

export const GOOGLE_DRIVE_SCOPES = [
    'https://www.googleapis.com/auth/drive',
];

export class GoogleDriveHelper {
    private readonly fileUrlPattern: RegExp = /\/file\/d\/([a-zA-Z0-9_-]+)/;
    private readonly folderUrlPattern: RegExp = /\/folders\/([a-zA-Z0-9_-]+)/;
    private readonly clientCredentials = {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URIS
    }

    private userId: string;
    private drive: drive_v3.Drive;

    constructor(accessToken: string, userId: string) {
        this.userId = userId;
        this.drive = google.drive({
            version: 'v3',
            auth: this.getOAuth2Client(accessToken)
        })
    }

    async uploadFileByFolderUrl(folderUrl: string, filePath: string) {
        const folderId = this.getFolderIdFromUrl(folderUrl);

        if (!folderId) {
            console.log(`Uploading file ${filePath} failed due to invalid google drive url ${url}`);

            return Promise.reject('Invalid google drive file link')
        }

        await this.uploadFileByFolderId(folderId, filePath);
    }

    async uploadFileByFolderId(folderId: string, filePath: string) {
        const fileName = filePath.split('/')[-1];
        const fileExtension = filePath.split('.')[-1];

        try {
            const fileMetadata = {
                name: fileName,
                parents: [folderId],
            };

            const media = {
                mimeType: DocumentsHelper.getMimetypeFromExtension(fileExtension), // MIME type of the file
                body: DocumentsHelper.getReadStream(filePath)
            };

            const response = await this.drive.files.create({
                requestBody: fileMetadata,
                media,
                fields: 'id',
            });

            console.log('File uploaded successfully. File ID:', response.data.id);

            return response;
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }

    async downloadFilesFromFolder(folderUrl: string) {
        try {
            const files = await this.getFilesByFolderUrl(folderUrl);

            if (files && files.length > 0) {
                for (const file of files) {
                    console.log(`Downloading file ${file.name}`)

                    await this.downloadFileById(file.id!);
                }

                return files;
            } else {
                console.log('No files found in the directory.');

                return files;
            }
        } catch (error) {
            console.error(`Error downloading files from ${folderUrl}:`, error);

            Promise.reject(`Failed to download files from ${folderUrl} due to ${error}`)
        }
    }

    async downloadFileByUrl(fileUrl: string) {
        const fileId = this.getFileIdFromUrl(fileUrl);

        if (!fileId) {
            console.log(`Downloading file failed due to invalid google drive url ${url}`);

            return Promise.reject('Invalid google drive file link')
        }

        return await this.downloadFileById(fileId);
    }

    async downloadFileById(fileId: string) {
        try {
            const fileMetadata = await this.drive.files.get({ fileId, fields: 'name' });
            const destinationFilePath = await DocumentsHelper.getDocumentPath(this.userId, fileMetadata.data.name!);
            const destinationFile = DocumentsHelper.getWriteStream(destinationFilePath);

            const response = await this.drive.files.get(
                { fileId: fileId, alt: 'media' },
                { responseType: 'stream' }
            );

            response.data.pipe(destinationFile);
            console.log(`Successfully downloaded file by id ${fileId}`);

            await new Promise((resolve, reject) => {
                destinationFile.on('finish', resolve);
                destinationFile.on('error', reject);
            });
        } catch (error) {
            console.log(`Downloading file ${fileId} from google drive failed with error ${error}`);

            return Promise.reject(error);
        }
    }

    async getFilesByFolderUrl(folderUrl: string) {
        console.log(`Getting files from folder ${folderUrl}`)
        const folderId = this.getFolderIdFromUrl(folderUrl);

        if (!folderId) {
            return Promise.reject('Invalid google drive file link')
        }

        try {
            return await this.getAllFilesByFolderId(folderId)
        } catch (err) {
            console.log(`Getting files from folder ${folderUrl} failed due to ${err}`);

            return Promise.reject(err);
        }
    }

    async getAllFilesByFolderId(folderId: string): Promise<drive_v3.Schema$File[]> {
        const files: drive_v3.Schema$File[] = [];

        const getFilesRecursive = async (folderId: string, parentPath: string = ''): Promise<void> => {
            const response = await this.drive.files.list({
                q: `'${folderId}' in parents and trashed=false`,
                fields: 'files(name, mimeType, id)',
                pageSize: 1000
            });
            const items = response.data.files;

            if (items) {
                for (const item of items) {
                    const filePath = parentPath ? `${parentPath}/${item.name}` : item.name;

                    if (item.mimeType === 'application/vnd.google-apps.folder') {
                        await getFilesRecursive.call(this, item.id!, filePath!); // Recursively get files from subfolder
                    } else {
                        files.push({ ...item, name: filePath }); // Add file to flattened list
                    }
                }
            }
        }

        await getFilesRecursive.call(this, folderId);

        return this.getValidDocumentsFromFiles(files);
    }

    private getFolderIdFromUrl(folderUrl: string) {
        const match = folderUrl.match(this.folderUrlPattern);

        if (match && match[1]) {
            return match[1];
        }

        return null;
    }

    private getFileIdFromUrl(fileUrl: string) {
        const match = fileUrl.match(this.fileUrlPattern);

        if (match && match[1]) {
            return match[1];
        }

        return null;
    }

    private getValidDocumentsFromFiles(files: drive_v3.Schema$File[]) {
        return files.filter(file => DocumentsHelper.allowedFileMimeTypes.includes(file.mimeType!))
    }

    private getOAuth2Client(token: string) {
        const oAuth2Client = new google.auth.OAuth2(
            this.clientCredentials.client_id,
            this.clientCredentials.client_secret,
            this.clientCredentials.redirect_uri
        );

        oAuth2Client.setCredentials({ access_token: token });

        return oAuth2Client;
    }
}