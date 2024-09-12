import { prisma } from '../../config';
import { PrismaClient, Skin } from '@prisma/client';
import { CreateSkinParams, UpdateSkinParams } from '../../utils/types';

const createSkin = async (params: CreateSkinParams): Promise<Skin> => {
    return await prisma.skin.create({
        data: params
    });
};

const getAllSkins = async (): Promise<Skin[]> => {
    return await prisma.skin.findMany();
};

const getSkinByName = async (name: string): Promise<Skin | null> => {
    return await prisma.skin.findFirst({
        where: { name }
    });
};

const getSkinsByIds = async (skinIds: number[]): Promise<Skin[]> => {
    
    return await prisma.skin.findMany({
        where: {
            id: {
                in: skinIds
            }
        }
    });
};

const updateSkin = async (id: number, params: UpdateSkinParams): Promise<Skin> => {
    return await prisma.skin.update({
        where: { id },
        data: params
    });
};

const deleteSkin = async (id: number): Promise<Skin> => {
    await prisma.raffleSkin.deleteMany({
        where: { skin_id: id },
    });

    const deletedSkin = await prisma.skin.delete({
        where: { id }
    });

    return deletedSkin;
};
export default {
    createSkin,
    getAllSkins,
    getSkinsByIds,
    getSkinByName,
    updateSkin,
    deleteSkin
};
