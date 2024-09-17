import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { handlePaymentNotification } from '../services/payment-service';

export async function paymentNotificationController(req: Request, res: Response) {
  try {
    console.log("Iniciando processamento da notificação de pagamento");
    const { id } = req.body;

    console.log("ID do pagamento recebido:", id);

    const updatedTransaction = await handlePaymentNotification(id);

    console.log("Transação atualizada com sucesso:", updatedTransaction);

    return res.status(httpStatus.OK).send({ message: 'Notificação processada com sucesso', updatedTransaction });
  } catch (error) {
    console.error('Erro ao processar notificação de pagamento:', error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Erro ao processar notificação' });
  }
}
