import crypto from 'crypto';
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';

const pipe = promisify(pipeline);

export const performHash = async (args) => {
  if (args.length !== 1) {
    console.log('Invalid input. Usage: hash <path_to_file>');
    return;
  }

  const [filePath] = args;
  try {
    const hash = crypto.createHash('sha256');
    const readStream = fs.createReadStream(filePath);

    await pipe(
      readStream,
      hash.setEncoding('hex')
    );

    console.log(`The SHA-256 hash of ${filePath} is: ${hash.read()}`);
  } catch (error) {
    console.error(`Failed to calculate hash for ${filePath}: ${error.message}`);
  }
};