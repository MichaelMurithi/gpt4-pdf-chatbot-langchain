import { authenticate } from "@google-cloud/local-auth";
import { google } from "googleapis";
import path from "path";

/**
 * Lists the names and IDs of up to 10 files.
 */
export async function runSample() {
    // Obtain user credentials to use for the request
    const currentDirectory = process.cwd();

    const auth = await authenticate({
        keyfilePath: path.join(currentDirectory, '/drive/oauth2.keys.json'),
        scopes: 'https://www.googleapis.com/auth/drive.metadata.readonly',
    });

    google.options({ auth });

    const service = google.drive('v3');
    const res = await service.files.list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name)',
    });
    const files: any = res.data.files;

    if (files.length === 0) {
        console.log('No files found.');
    } else {
        console.log('Files:');
        for (const file of files) {
            console.log(`${file.name} (${file.id})`);
        }
    }
}