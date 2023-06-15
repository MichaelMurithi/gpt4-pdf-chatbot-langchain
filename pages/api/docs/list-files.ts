// pages/api/list-files.js
import { getDrive } from '@/utils/google-drive';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const drive = getDrive();
        // Call the Drive API to list files
        const response = await drive.files.list({
            pageSize: 10,
            fields: 'files(id, name, webViewLink, owners(emailAddress))',
        });

        const fileList = response.data.files;
        res.status(200).json({ files: fileList });
    } catch (error) {
        console.error('Error listing files:', error);
        res.status(500).json({ error: 'Failed to list files from Google Drive' });
    }
}
