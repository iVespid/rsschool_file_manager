import {printCurrentDirectory} from "./currentDirectoryManager.mjs";
import {getCommand, init} from "./commandsLoader.mjs";

const USERNAME = process.argv.slice(2)[0].split('=')[1];

async function run(command, args) {
    try {
        await getCommand(command)(args);
    } catch (e) {
        throw Error('Invalid input');
    }
}

console.log('Welcome to the File Manager, ' + USERNAME + '!');

(async () => {
    await init();
    process.stdin.on('data', async (data) => {
        const input = data.toString('utf-8').trim();
        const command = input.split(' ')[0];
        const args = input.split(' ').slice(1);

        try {
            await run(command, ...args);
        } catch (e) {
            console.error(e.message);
        }

        printCurrentDirectory();
    });

    process.stdin.on('end', () => {
        console.log('Thank you for using File Manager, ' + USERNAME + ', goodbye!');
    });
})();
