import * as zip from "./zip.mjs";

export const COMMANDS = {
    'compress': async (source, target) => await zip.compress(source, target),
    'decompress': async (source, target) => await zip.decompress(source, target)
}