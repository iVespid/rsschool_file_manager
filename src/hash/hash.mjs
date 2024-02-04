import crypto from "crypto";
import fs from "fs/promises";
import {resolvePath} from "../currentDirectoryManager.mjs";

export async function calculateHash(filePath) {
    const hash = crypto.createHash('sha256');
    const fileContent = await fs.readFile(resolvePath(filePath), {encoding: 'utf8'})
    hash.write(fileContent);
    hash.end();
    console.log(hash.read().toString('hex'));
}