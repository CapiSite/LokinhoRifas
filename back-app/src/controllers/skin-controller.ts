import httpStatus from 'http-status';
import path from 'path';
import { Request, Response } from 'express';
import skinService from '../services/skin-service';

export const getAllSkins = async (req: Request, res: Response) => {
    try {
        const skins = await skinService.getAllSkins();
        res.status(httpStatus.OK).json(skins);
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Erro ao buscar skins", error });
    }
};

export const createSkin = async (req: Request, res: Response) => {
    let {picture} = req.body
    if (req.file && req.file.path) {
        picture = path.basename(req.file.path);
    }
    const { name, type } = req.body.skinData;
    try {
        const value = Number(req.body.skinData.value)
        const skin = await skinService.createSkin({ name, value, picture, type });
        res.status(httpStatus.CREATED).json(skin);
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json({ message: error.message, error });
    }
};

export const updateSkin = async (req: Request, res: Response) => {
    const { id } = req.params;
    let picture = req.body.picture;
    if (req.file && req.file.path) {
        picture = path.basename(req.file.path);
    }
    console.log("oi2")
    const { name, value, type } = req.body.skinData;
    console.log(req.body.skinData)

    try {
        const skin = await skinService.updateSkin(parseInt(id), { name, value, picture, type });
        res.status(httpStatus.OK).json(skin);
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json({ message: error.message, error });
    }
};

export const deleteSkin = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await skinService.deleteSkin(parseInt(id));
        res.sendStatus(httpStatus.NO_CONTENT);
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Erro ao deletar skin", error });
    }
};
