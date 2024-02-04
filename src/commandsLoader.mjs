const PATHS_CONFIG = [
    './file/commands.mjs',
    './os/commands.mjs',
    './zip/commands.mjs',
    './basic/commands.mjs'
]

let COMMANDS;

export function getCommand(name) {
    return COMMANDS[name];
}

export async function init() {
    if (!COMMANDS) {
        COMMANDS = await loadCommands();
    }
}

async function loadCommands() {
    const commandsArray = [];
    await Promise.all(PATHS_CONFIG.map(async (p) => {
        try {
            const commands = await import(p);
            commandsArray.push(commands.COMMANDS);
        } catch (e) {
            console.error('Module commands not loaded: ' + p);
        }
    }));
    return commandsArray.reduce((p, c) => {
        return {...p, ...c}
    }, {});
}
