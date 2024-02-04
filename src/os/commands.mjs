import * as os from "./os.mjs";

export const COMMANDS = {
    'os': async (args) => await os.runOsCommand(args),
}