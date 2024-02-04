import os from 'os';
import path from 'path';

export let currentDir = os.homedir();

export function changeDirectory(p) {
    currentDir = resolvePath(p);
}

export function resolvePath(p) {
    if (path.isAbsolute(p)) {
        return p;
    } else {
        return path.resolve(currentDir, p);
    }
}

export function printCurrentDirectory() {
    console.log('You are currently in ' + currentDir);
}
