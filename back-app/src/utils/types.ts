// types/skinTypes.ts
import { Skin } from '@prisma/client';

export interface CreateSkinParams {
    name: string;
    value: number;
    picture: string;
    type: string
}

export interface UpdateSkinParams {
    name: string;
    value: number;
    picture: string;
    type: string
}

export type RaffleParams = {
    name: string;
    users_quantity: number;  // Pegando diretamente o campo do modelo Raffle
    skins: number[];         // Array de IDs de skins
}

// types/raffleTypes.ts
export interface CreateRaffleParams {
    users_quantity: number;
    skins: number[];  // IDs das skins
}
