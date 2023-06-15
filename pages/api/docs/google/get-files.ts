import { GoogleDriveHelper } from '@/lib/google-drive-helper';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { token } = req.headers;
        const { folderUrl, userId } = req.body;

        console.log(userId, token);

        if (!token) {
            return res.status(403).json('Unauthorized');
        }

        if (!userId) {
            return res.status(400).json('Missing user id');
        }

        try {
            const googleDriveHelper = new GoogleDriveHelper(token.toString(), userId.toString());
            const files = await googleDriveHelper.getFilesByFolderUrl(folderUrl);

            res.status(200).json({ files: files });
        } catch (error) {
            res.status(500).json({ error: error })
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
