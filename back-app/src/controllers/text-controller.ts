import httpStatus from 'http-status';
import { Request, Response } from 'express';
import textService from '../services/text-service';

export const getText = async (req: Request, res: Response) => {
    try {
        const text = await textService.getText();
        res.status(httpStatus.OK).json(text);
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Erro ao buscar texto", error });
    }
};

export const postText = async (req: Request, res: Response) => {
    const text:string = req.body.text;
    try {
        const response = await textService.postText(text);
        res.status(httpStatus.CREATED).json(response);
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json({ message: "Erro ao trocar texto", error });
    }
};