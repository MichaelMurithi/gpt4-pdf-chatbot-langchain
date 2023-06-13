import formidable from 'formidable';
import * as fs from 'fs';
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
        options.uploadDir = path.join(process.cwd(), "/docs", userId);

        options.filename = (name, ext, path, form) => {
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

    try {
        await fs.readdir(path.join(process.cwd(), "/docs", userId),
            (_, files) => console.log(`Read ${files.length} files`)
        )
    } catch (e) {
        await fs.mkdir(path.join(process.cwd(), "/docs", userId),
            () => console.log(`User documents directory created successfully`)
        )
    }

    await readFile(req, true);

    res.json({ done: "ok" })
}

export default handler;