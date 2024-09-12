import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { handlePaymentNotification } from '../services/payment-service';

export async function paymentNotificationController(req: Request, res: Response) {
  try {
    const { id } = req.body;

    const updatedTransaction = await handlePaymentNotification(id);

    return res.status(httpStatus.OK).send({ message: 'Notificação processada com sucesso', updatedTransaction });
  } catch (error) {
    console.error('Erro ao processar notificação de pagamento:', error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Erro ao processar notificação' });
  }
}
