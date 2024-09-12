// middleware/checkPictureType.js
import { NextFunction, Request, Response } from 'express';
import multer from 'multer';

const checkPictureType = (req: Request, res: Response, next:NextFunction) => {
    if (typeof req.body.picture === 'string' && req.body.picture === 'Default') {
        // Se a imagem for uma string "Default", não envie para o middleware do multer
        next('route');
    } else {
        // Se não for uma string "Default", passe para o middleware do multer
        next(); // Passe para o próximo middleware (que deve ser o middleware do multer)
    }
};

export { checkPictureType };
