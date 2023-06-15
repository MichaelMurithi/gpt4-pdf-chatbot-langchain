import DocumentsHelper from '@/lib/documents-helper';
import formidable from 'formidable';
import { NextApiHandler, NextApiRequest } from 'next';
import path from 'path';

export const config = {
    api: {
        bodyParser: false
    }
}

const readFile = (req: NextApiRequest, saveLocally: boolean) => {
    const options: formidable.Options = {};
    const userId: string = req.headers.userId as string;

    if (saveLocally) {
        options.uploadDir = path.join(process.cwd(), "/documents", userId);

        options.filename = (_name, _ext, path, form) => {
            return userId + "_" + path.originalFilename;
        }

        console.log(options);
    }

    const form = formidable();

    console.log(form);

    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files })
        });
    })
}

const handler: NextApiHandler = async (req, res) => {
    const userId: string = req.headers.userId as string;

    DocumentsHelper.getUserDocumentsDirectory(userId);

    await readFile(req, true);

    res.json({ done: "ok" })
}

export default handler;