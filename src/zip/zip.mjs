import fs from 'fs/promises';
import zlib from 'zlib';
import {pipeline} from "stream/promises";
import {resolvePath} from "../currentDirectoryManager.mjs";

export async function compress(decompressedPath, targetPath) {
    const readStream = (await fs.open(resolvePath(decompressedPath))).createReadStream();
    const writeStream = (await fs.open(resolvePath(targetPath), 'w')).createWriteStream();
    await pipeline(readStream, zlib.createBrotliCompress(), writeStream);
}

export async function decompress(compressedPath, targetPath) {
    const readStream = (await fs.open(resolvePath(compressedPath))).createReadStream();
    const writeStream = (await fs.open(resolvePath(targetPath), 'w')).createWriteStream();
    await pipeline(readStream, zlib.createBrotliDecompress(), writeStream);
}