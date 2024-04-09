import os from 'os'
import fs from 'fs/promises';
import path from 'path';

export const performUp = async () => {
    const newDir = path.resolve(process.cwd(), '..');
    // проверяем, что мы не выходим за пределы домашнего каталога
    const homeDir = os.homedir();
    if (newDir === homeDir || newDir.startsWith(homeDir)) {
        process.chdir(newDir);
    }
    console.log(`You are currently in ${process.cwd()}`);
};

export const performCd = async (args) => {
    if (args.length !== 1) {
        console.log('Usage: cd <path_to_directory>');
        return;
    }
    const newDir = path.resolve(process.cwd(), args[0]);
    try {
        const stats = await fs.stat(newDir);
        if (stats.isDirectory()) {
            process.chdir(newDir);
            console.log(`You are currently in ${process.cwd()}`);
        } else {
            console.log('The specified path is not a directory');
        }
    } catch (error) {
        console.error('The specified path does not exist');
    }
};

export const performLs = async () => {
    try {
        const files = await fs.readdir(process.cwd(), { withFileTypes: true });
        const detailedFiles = files.map(dirent => ({
            name: dirent.name,
            type: dirent.isDirectory() ? 'directory' : 'file'
        })).sort((a, b) => {
            // сортируем папки перед файлами, затем по имени
            if (a.type === b.type) return a.name.localeCompare(b.name);
            return a.type === 'directory' ? -1 : 1;
        });
        
        console.table(detailedFiles);
    } catch (error) {
        console.error('Unable to list the contents of the directory');
    }
};