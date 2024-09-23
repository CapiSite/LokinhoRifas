import fs from 'fs';
import path from 'path';

import { Skin } from '@prisma/client';
import skinRepository from '../../repositories/skin-repository';
import { duplicatedSkinNameError } from './errors';
import { CreateSkinParams, UpdateSkinParams } from '../../utils/types';

const uploadFolderPath = path.join(__dirname, '../../uploads');

export async function createSkin(params: CreateSkinParams): Promise<Skin> {
    const { name } = params;
    await validateUniqueSkinNameOrFail(name);
    return skinRepository.createSkin(params);
}

export async function getAllSkins(): Promise<Skin[]> {
    return skinRepository.getAllSkins();
}

export async function updateSkin(id: number, params: UpdateSkinParams): Promise<Skin> {
    const { name, picture } = params;
    await validateUniqueSkinNameOrFail2(name, id);

    const existingSkin = await skinRepository.getSkinById(id);

    if (existingSkin && existingSkin.picture !== picture && existingSkin.picture !== 'default.jpg') {
        const oldImagePath = path.join(uploadFolderPath, existingSkin.picture);
        if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath); 
        }
    }

    return skinRepository.updateSkin(id, params);
}

export async function deleteSkin(id: number): Promise<Skin> {
    const existingSkin = await skinRepository.getSkinById(id);

    if (existingSkin && existingSkin.picture !== 'default.jpg') {
        const imagePath = path.join(uploadFolderPath, existingSkin.picture);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
    }

    return skinRepository.deleteSkin(id);
}



async function validateUniqueSkinNameOrFail2(name: string, id: number): Promise<void> {
    const existingSkin = await skinRepository.getSkinByName(name);

    if (!existingSkin) {
        return;
    }
    if (existingSkin.id === id) {
        return;
    }
    throw duplicatedSkinNameError();
}

async function validateUniqueSkinNameOrFail(name: string): Promise<void> {
    console.log(name)
    const existingSkin = await skinRepository.getSkinByName(name);
    console.log(existingSkin)
    if (existingSkin) {
        throw duplicatedSkinNameError();
    }
}

export default {
    createSkin,
    getAllSkins,
    updateSkin,
    deleteSkin
};
