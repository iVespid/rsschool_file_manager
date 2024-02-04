import os from 'os';

const COMMANDS = {
    '--EOL': () => console.log(JSON.stringify(os.EOL)),
    '--cpus': () => getCPUs(),
    '--homedir': () => console.log(`Home directory: ${os.homedir()}`),
    '--username': () => console.log(`Current user: ${os.userInfo().username}`),
    '--architecture': () => console.log(`CPU Architecture: ${os.arch()}`),
}

function getCPUs() {
    const cpuInfo = os.cpus();
    console.log(`Total CPUs: ${cpuInfo.length}`);
    cpuInfo.forEach((cpu, index) => {
        console.log(`CPU#${index+1}`);
        console.log(`\tModel: ${cpu.model}`);
        console.log(`\tClock Rate: ${cpu.speed / 1000} GHz`);
    });
}

export async function runOsCommand(...args) {
    COMMANDS[args[0]]();
}