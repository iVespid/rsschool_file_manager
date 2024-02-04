import {add, cat, copy, ls, move, remove, rename} from "./basicFileOperations.mjs";
import {calculateHash} from "../hash/hash.mjs";

export const COMMANDS = {
    'ls': async () => await ls(),
    'cat': async (filePath) => await cat(filePath),
    'add': async (filePath) => await add(filePath),
    'rn': async (sourcePath, targetPath) => await rename(sourcePath, targetPath),
    'cp': async (sourcePath, targetPath) => await copy(sourcePath, targetPath),
    'mv': async (sourcePath, targetPath) => await move(sourcePath, targetPath),
    'rm': async (sourcePath, targetPath) => await remove(sourcePath, targetPath),
    'hash': async (filePath) => await calculateHash(filePath),
}