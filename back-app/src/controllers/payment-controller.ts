import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '../middlewares';
import { createPayment } from '../services/payment-service';

export async function createPaymentController(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;

  try {
    const transaction = await createPayment(req.body, userId);
    return res.status(httpStatus.OK).send(transaction);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
}
