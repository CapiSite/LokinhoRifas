// services/skins-service.ts
import { Skin } from '@prisma/client';
import skinRepository from '../../repositories/skin-repository';
import { duplicatedSkinNameError } from './errors';
import { CreateSkinParams, UpdateSkinParams } from '../../utils/types';

export async function createSkin(params: CreateSkinParams): Promise<Skin> {
    const { name } = params;
    await validateUniqueSkinNameOrFail(name);
    return skinRepository.createSkin(params);
}

export async function getAllSkins(): Promise<Skin[]> {
    return skinRepository.getAllSkins();
}

export async function updateSkin(id: number, params: UpdateSkinParams): Promise<Skin> {
    const { name } = params;
    await validateUniqueSkinNameOrFail(name);
    return skinRepository.updateSkin(id, params);
}

export async function deleteSkin(id: number): Promise<Skin> {
    return skinRepository.deleteSkin(id);
}

async function validateUniqueSkinNameOrFail(name: string): Promise<void> {
    const existingSkin = await skinRepository.getSkinByName(name);
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
