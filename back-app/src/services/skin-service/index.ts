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

    // Verificar se há uma imagem atual e renomear a nova para o mesmo nome
    if (existingSkin && existingSkin.picture !== 'default.jpg') {
        const oldImagePath = path.join(uploadFolderPath, existingSkin.picture);

        if (picture && fs.existsSync(path.join(uploadFolderPath, picture))) {
            // Caminho da nova imagem
            const newImagePath = path.join(uploadFolderPath, picture);

            // Substituir o novo arquivo pelo nome da imagem antiga
            fs.renameSync(newImagePath, oldImagePath);
            params.picture = existingSkin.picture; // Mantém o nome antigo no banco
        }
    }

    // Atualizar o skin com os novos dados e o nome da imagem mantido
    return skinRepository.updateSkin(id, params);
}

export async function deleteSkin(id: number): Promise<Skin> {
    // Verifica se a skin existe antes de deletar
    const existingSkin = await skinRepository.getSkinById(id);

    if (!existingSkin) {
        throw new Error(`Skin com ID ${id} não encontrada.`);
    }

    // Apenas deleta a skin do banco de dados, sem mexer na imagem
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
