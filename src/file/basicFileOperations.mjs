import {validatePathExist} from "./common.mjs";
import fs from "fs/promises";
import {currentDir, resolvePath} from "../currentDirectoryManager.mjs";

import {pipeline} from "stream/promises";

export async function ls() {
    const content = await fs.readdir(currentDir);
    const results = await Promise.all(content.map(async (f) => {
        const result = {};
        const stats = await fs.stat(resolvePath(f));
        result.Name = f;
        if (stats.isDirectory()) {
            result.Type = 'directory';
        } else {
            result.Type = 'file';
        }

        return result;
    }));

    const alphabeticalOrderSorter = function (a, b) {
        if (a.Name < b.Name) {
            return -1;
        } else if (a.Name > b.Name) {
            return 1;
        } else {
            return 0;
        }
    }
    const directories = results.filter(d => d.Type === 'directory').sort(alphabeticalOrderSorter);
    const files = results.filter(d => d.Type === 'file').sort(alphabeticalOrderSorter);

    console.table([...directories, ...files]);
}

export async function cat(p) {
    const filePath = resolvePath(p);
    await validatePathExist(true, filePath);
    const f = await fs.open(filePath);
    const stream = f.createReadStream({encoding: 'utf8'});
    await pipeline(stream, process.stdout);
    console.log('');
}

export async function add(fileName) {
    const filePath = resolvePath(fileName);
    await validatePathExist(false, filePath);
    await fs.writeFile(filePath, '');
}

export async function rename(sourcePath, targetPath) {
    const sourceFilePath = resolvePath(sourcePath);
    await validatePathExist(true, sourceFilePath);
    const targetFilePath = resolvePath(targetPath);
    await validatePathExist(false, targetFilePath);
    await fs.rename(sourceFilePath, targetFilePath);
}

export async function copy(sourcePath, targetPath) {
    const sourceFilePath = resolvePath(sourcePath);
    await validatePathExist(true, sourceFilePath);
    const targetFilePath = resolvePath(targetPath);
    await validatePathExist(false, targetFilePath);
    const fhs = await fs.open(sourceFilePath);
    const fht = await fs.open(targetFilePath);
    await pipeline(fhs.createReadStream(sourceFilePath), fht.createWriteStream(targetFilePath));
}

export async function remove(sourcePath) {
    await fs.unlink(resolvePath(sourcePath));
}

export async function move(sourcePath, targetPath) {
    await copy(sourcePath, targetPath);
    await remove(sourcePath);
}

