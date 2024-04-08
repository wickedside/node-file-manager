import fs from 'fs/promises';
import path from 'path';

// Проверка существования файла или директории
export const checkExists = async (filePath) => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

// Получение полного пути с учётом текущего рабочего каталога
export const getFullPath = (relativePath) => {
  return path.resolve(process.cwd(), relativePath);
};

// Проверка, является ли путь папкой
export const isDirectory = async (fullPath) => {
  try {
    const stats = await fs.stat(fullPath);
    return stats.isDirectory();
  } catch {
    return false;
  }
};

// Сортировка файлов и папок
export const sortFilesAndDirs = (filesAndDirs) => {
  return filesAndDirs.sort((a, b) => {
    // Сортируем папки перед файлами, затем по имени
    if (a.type === b.type) return a.name.localeCompare(b.name);
    return a.type === 'directory' ? -1 : 1;
  });
};

// Проверка, не выходим ли мы за пределы допустимой директории
export const isPathAccessible = (pathToCheck, homeDir) => {
  const resolvedPath = path.resolve(pathToCheck);
  return resolvedPath.startsWith(homeDir);
};