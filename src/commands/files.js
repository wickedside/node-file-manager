import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';

export const performCat = async (args) => {
  if (args.length !== 1) {
    console.log('Invalid input. Usage: cat <path_to_file>');
    return;
  }

  const [filePath] = args.map(arg => path.resolve(process.cwd(), arg));
  try {
    const readStream = createReadStream(filePath, { encoding: 'utf-8' });
    readStream.pipe(process.stdout);
  } catch (error) {
    console.error(`Failed to read file ${filePath}: ${error.message}`);
  }
};

export const performAdd = async (args) => {
  if (args.length !== 1) {
    console.log('Invalid input. Usage: add <new_file_name>');
    return;
  }

  const [fileName] = args;
  const filePath = path.resolve(process.cwd(), fileName);

  try {
    await fs.writeFile(filePath, '');
    console.log(`File ${fileName} has been created`);
  } catch (error) {
    console.error(`Failed to create file ${filePath}: ${error.message}`);
  }
};

export const performRm = async (args) => {
  if (args.length !== 1) {
    console.log('Invalid input. Usage: rm <path_to_file>');
    return;
  }

  const [filePath] = args.map(arg => path.resolve(process.cwd(), arg));
  try {
    await fs.unlink(filePath);
    console.log(`File ${filePath} has been deleted`);
  } catch (error) {
    console.error(`Failed to delete file ${filePath}: ${error.message}`);
  }
};

export const performRn = async (args) => {
  if (args.length !== 2) {
    console.log('Invalid input. Usage: rn <path_to_file> <new_filename>');
    return;
  }

  const [oldPath, newName] = args;
  const newPath = path.resolve(process.cwd(), newName);

  try {
    await fs.rename(path.resolve(process.cwd(), oldPath), newPath);
    console.log(`File has been renamed to ${newName}`);
  } catch (error) {
    console.error(`Failed to rename file: ${error.message}`);
  }
};

export const performCp = async (args) => {
  if (args.length !== 2) {
    console.log('Invalid input. Usage: cp <path_to_file> <path_to_new_directory>');
    return;
  }

  const [source, destination] = args.map(arg => path.resolve(process.cwd(), arg));
  try {
    await pipeline(
      createReadStream(source),
      createWriteStream(destination)
    );
    console.log(`File has been copied to ${destination}`);
  } catch (error) {
    console.error(`Failed to copy file: ${error.message}`);
  }
};

export const performMv = async (args) => {
  if (args.length !== 2) {
    console.log('Invalid input. Usage: mv <path_to_file> <path_to_new_directory>');
    return;
  }

  const [source, destination] = args.map(arg => path.resolve(process.cwd(), arg));
  try {
    await performCp([source, destination]);
    await performRm([source]);
  } catch (error) {
    console.error(`Failed to move file: ${error.message}`);
  }
};