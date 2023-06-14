import * as fs from 'fs';
import path from "path";

export default class DocumentsHelper {
    private static readonly extensionToMimetypeMap: Record<string, string> = {
        '.pdf': 'application/pdf',
        '.doc': 'application/msword',
        '.md': 'text/markdown',
        '.csv': 'text/csv',
        '.txt': 'text/plain',
        '.docm': 'application/vnd.ms-word.document.macroEnabled.12',
        '.dotm': 'application/vnd.ms-word.template.macroEnabled.12',
        '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        '.dotx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
    };

    static allowedFileExtensions = Object.keys(this.extensionToMimetypeMap);
    static allowedFileMimeTypes = Object.values(this.extensionToMimetypeMap);

    static async getUserDocumentsDirectory(userId: string): Promise<string> {
        const userFilesDirectory = path.join(path.join(process.cwd(), "/documents"), userId);

        try {
            await fs.readdir(userFilesDirectory, (_, _files) => console.log(`Found an existing user's directory at ${userFilesDirectory}`))

            return userFilesDirectory;
        } catch (e) {
            await fs.mkdir(userFilesDirectory, () => console.log(`User's documents directory created successfully at ${userFilesDirectory}`))

            throw (e);
        }
    }

    static getMimetypeFromExtension(fileExtension: string) {
        return this.extensionToMimetypeMap[fileExtension.toLowerCase()] || 'application/octet-stream';
    }

    static deleteDocument(filePath: string) {
        return fs.unlink(filePath, (error) => {
            if (error) {
                console.error(`Error deleting file from path ${filePath}:`, error);
            } else {
                console.log('File deleted successfully:', filePath);
            }
        });
    }

    static getReadStream(filePath: string) {
        return fs.createReadStream(filePath)
    }

    static getWriteStream(filePath: string) {
        return fs.createWriteStream(filePath);
    }
}