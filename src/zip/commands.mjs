import * as zip from "./zip.mjs";

export const COMMANDS = {
    'compress': async (args) => await zip.compress(args),
    'decompress': async (args) => await zip.decompress(args)
}