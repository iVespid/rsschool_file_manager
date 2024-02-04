import * as dm from "../currentDirectoryManager.mjs";

export const COMMANDS = {
    '.exit': () => process.exit(),
    'up': () => dm.changeDirectory('../'),
    'cd': (args) => dm.changeDirectory(args),
}