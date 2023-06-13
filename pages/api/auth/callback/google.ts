import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (_, res) => {
    try {
        res.redirect('/');
    } catch (error) {
        console.error('Error authenticating with Google Drive:', error);
        res.status(500).json({ error: 'Failed to authenticate with Google Drive' });
    }
};

export default handler;
