import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { handlePaymentNotification, validateMercadoPagoSignature } from '../services/payment-service';

export async function paymentNotificationController(req: Request, res: Response) {
  try {
    // Captura do header x-signature
    const signatureHeader = req.headers['x-signature'] as string;
    const secret = process.env.MP_WEBHOOK_SECRET;

    console.log("Recebido x-signature:", signatureHeader);
    console.log("MP_WEBHOOK_SECRET presente:", !!secret);

    // Validar o x-signature
    if (!signatureHeader || !secret) {
      console.error('Assinatura não encontrada ou secret não configurado');
      return res.status(httpStatus.BAD_REQUEST).send({ message: 'Assinatura não encontrada ou secret não configurado' });
    }

    const payload = JSON.stringify(req.body); // Serializa o payload para validação
    console.log("Payload recebido:", payload);

    const isValidSignature = validateMercadoPagoSignature(signatureHeader, secret, payload);
    console.log("Assinatura válida:", isValidSignature);

    if (!isValidSignature) {
      console.error('Assinatura inválida');
      return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Assinatura inválida' });
    }

    // Processar notificação normalmente se a assinatura for válida
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
