import { MercadoPagoConfig, Payment } from 'mercadopago';
import userRepository from "../../repositories/user-repository";
import transactionRepository from "../../repositories/transaction-repository";

const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_KEY,
});

const payment = new Payment(client);

export async function createPayment(body: any, userId: number) {
  try {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const paymentData = {
      transaction_amount: body.transaction_amount,
      token: body.token,
      description: 'Adicionar saldo',
      installments: body.installments || 1,
      payment_method_id: body.payment_method_id,
      payer: {
        email: user.email,
        identification: body.payer.identification,
      },
    };

    const paymentResponse = await payment.create({ body: paymentData });
    console.log(paymentResponse);
    
    const transactionData = {
      userId,
      paymentId: paymentResponse.id.toString(),
      status: paymentResponse.status,
      statusDetail: paymentResponse.status_detail,
      paymentMethod: paymentResponse.payment_method_id,
      transactionAmount: paymentResponse.transaction_amount,
      dateApproved: paymentResponse.date_approved ? new Date(paymentResponse.date_approved) : null,
      qrCode: paymentResponse.payment_method_id === 'pix' ? paymentResponse.point_of_interaction.transaction_data.qr_code : null,
      qrCodeBase64: paymentResponse.payment_method_id === 'pix' ? paymentResponse.point_of_interaction.transaction_data.qr_code_base64 : null,
    };

    const transaction = await transactionRepository.createTransactionMeli(transactionData);

    if (paymentResponse.status === 'approved') {
      await userRepository.incrementUserBalance(userId, paymentResponse.transaction_amount);
    }

    delete transaction.paymentId;

    return transaction;
  } catch (error) {
    console.error('Erro ao criar a preferência de pagamento:', error);
    throw new Error(`Erro ao criar a preferência de pagamento: ${error.message}`);
  }
}



export async function handlePaymentNotification(paymentId: string) {
  try {
    const paymentResponse = await payment.get({ id: paymentId });

    if (!paymentResponse) {
      throw new Error('Pagamento não encontrado');
    }

    const updatedTransaction = await transactionRepository.updateTransactionStatus({
      paymentId: paymentResponse.id.toString(),
      status: paymentResponse.status,
      statusDetail: paymentResponse.status_detail,
      dateApproved: paymentResponse.status === 'approved' ? new Date(paymentResponse.date_approved) : null,
    });

    if (paymentResponse.status === 'approved') {
      await userRepository.incrementUserBalance(updatedTransaction.user_id, paymentResponse.transaction_amount);
    }
    delete updatedTransaction.paymentId

    return updatedTransaction;
  } catch (error) {
    console.error('Erro ao processar notificação de pagamento:', error);
    throw new Error(`Erro ao processar notificação de pagamento: ${error.message}`);
  }
}
