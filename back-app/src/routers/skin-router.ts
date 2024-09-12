import { createSkin, deleteSkin, getAllSkins, updateSkin } from '../controllers';
import { checkPictureType } from '../middlewares/check-picture-type';
import { uploadMain } from '../middlewares/multer-config';
import { Router } from 'express';
import { authenticateToken, authenticateAdmin, validateBody, validateParams, parseDataSkin } from '../middlewares';
import { skinSchema, skinIdSchema, skinSchemaUpload } from '../schemas';

const skinRouter = Router();

skinRouter.post('/', authenticateToken, authenticateAdmin, checkPictureType, uploadMain.single('picture'), parseDataSkin, validateBody(skinSchema), createSkin);

skinRouter.get('/', getAllSkins);

skinRouter.put('/:id', authenticateToken, authenticateAdmin, checkPictureType, uploadMain.single('picture'), parseDataSkin, validateParams(skinIdSchema), validateBody(skinSchemaUpload), updateSkin);

skinRouter.delete('/:id', authenticateToken, authenticateAdmin, deleteSkin);

export { skinRouter };
