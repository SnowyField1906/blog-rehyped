import fs from 'fs'
import path from 'path'

export const getAllFirstLevelFolders = (folder: string): string[] => {
    return fs
        .readdirSync(folder)
        .filter((file) => fs.statSync(path.join(folder, file)).isDirectory())
}

export const getAllFirstLevelFiles = (folder: string): string[] => {
    return fs
        .readdirSync(folder)
        .filter((file) => fs.statSync(path.join(folder, file)).isFile())
}

export const getCountAllFirstLevelFolders = (folder: string): number => {
    return fs
        .readdirSync(folder)
        .filter((file) => fs.statSync(path.join(folder, file)).isDirectory())
        .length
}
