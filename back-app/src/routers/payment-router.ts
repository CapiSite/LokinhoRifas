import { Router } from 'express';
import { authenticateToken } from '../middlewares';
import { createPaymentController } from '../controllers/payment-controller';
import { paymentNotificationController } from '../controllers/notification-controller';

const paymentRouter = Router();

paymentRouter.post('/', authenticateToken, createPaymentController);
paymentRouter.post('/notifications', paymentNotificationController);

export { paymentRouter };
