import {add, cat, copy, ls, move, remove, rename} from "./basicFileOperations.mjs";
import {calculateHash} from "../hash/hash.mjs";

export const COMMANDS = {
    'ls': async () => await ls(),
    'cat': async (args) => await cat(args),
    'add': async (args) => await add(args),
    'rn': async (args) => await rename(args),
    'cp': async (args) => await copy(args),
    'mv': async (args) => await move(args),
    'rm': async (args) => await remove(args),
    'hash': async (args) => await calculateHash(args),
}