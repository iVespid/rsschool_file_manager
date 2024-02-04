import fs from "fs/promises";

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