import {calculateHash} from "./hash.mjs";

export const COMMANDS = {
    'hash': async (args) => await calculateHash(args),
}