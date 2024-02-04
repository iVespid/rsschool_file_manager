import fs from "fs/promises";

export function pipeAsync(source, target) {
    return new Promise((resolve, reject) => {
        source.on('error', reject);
        target.on('error', reject);
        source.on('finish', resolve);
        target.on('finish', resolve);
        source.on('end', resolve);
        target.on('end', resolve);
        source.pipe(target);
    });
}

export async function validatePathExist(expectedExistState, filePath) {
    let isFileExists;
    try {
        await fs.access(filePath);
        isFileExists = true;
    } catch (error) {
        isFileExists = false;
    }
    if (expectedExistState !== isFileExists) {
        const errorMessage = expectedExistState ?
            `File path doesn't exist: ${filePath}` :
            `File path already exists: ${filePath}`;
        throw Error(errorMessage);
    }
}