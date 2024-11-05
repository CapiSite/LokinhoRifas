import { MercadoPagoConfig, Payment } from 'mercadopago';
import userRepository from "../../repositories/user-repository";
import transactionRepository from "../../repositories/transaction-repository";

const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_KEY,
});

const payment = new Payment(client);

export async function createPayment(body: any, userId: number) {
  try {
    console.log("Iniciando criação de pagamento para o usuário:", userId);

    const user = await userRepository.findById(userId);
    if (!user) {
      console.error('Usuário não encontrado para o ID:', userId);
      throw new Error('Usuário não encontrado');
    }

    console.log("Usuário encontrado:", user);

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

    console.log("Dados de pagamento a serem enviados:", paymentData);

    const paymentResponse = await payment.create({ body: paymentData });
    console.log("Resposta do pagamento:", paymentResponse);

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

    console.log("Dados da transação para salvar:", transactionData);

    const transaction = await transactionRepository.createTransactionMeli(transactionData);
    console.log("Transação criada:", transaction);

    if (paymentResponse.status === 'approved') {
      console.log("Pagamento aprovado. Incrementando saldo do usuário:", userId);
      await userRepository.incrementUserBalance(userId, paymentResponse.transaction_amount);
    }

    delete transaction.paymentId;
    console.log("Transação final após remoção do paymentId:", transaction);

    return transaction;
  } catch (error) {
    console.error('Erro ao criar a preferência de pagamento:', error);
    throw new Error(`Erro ao criar a preferência de pagamento: ${error.message}`);
  }
}



export async function handlePaymentNotification(paymentId: string) {
  try {
    console.log("Iniciando processamento da notificação de pagamento para o ID:", paymentId);

    const paymentResponse = await payment.get({ id: paymentId });

    if (!paymentResponse) {
      console.error('Pagamento não encontrado para o ID:', paymentId);
      throw new Error('Pagamento não encontrado');
    }

    console.log("Resposta do pagamento obtida:", paymentResponse);

    // Verifica se a transação já existe e foi processada para evitar duplicação
    const existingTransaction = await transactionRepository.getTransactionByPaymentId(paymentId);
    if (existingTransaction && existingTransaction.isProcessed) {
      console.log("Pagamento já processado anteriormente, ignorando duplicata.");
      return existingTransaction; // Retorna a transação existente sem processar novamente
    }

    // Atualiza o status da transação no banco de dados
    const updatedTransaction = await transactionRepository.updateTransactionStatus({
      paymentId: paymentResponse.id.toString(),
      status: paymentResponse.status,
      statusDetail: paymentResponse.status_detail,
      dateApproved: paymentResponse.status === 'approved' ? new Date(paymentResponse.date_approved) : null,
    });

    console.log("Transação atualizada:", updatedTransaction);

    // Incrementa o saldo do usuário se o pagamento foi aprovado e ainda não foi processado
    if (paymentResponse.status === 'approved' && !updatedTransaction.isProcessed) {
      console.log("Pagamento aprovado. Incrementando saldo do usuário:", updatedTransaction.user_id);
      await userRepository.incrementUserBalance(updatedTransaction.user_id, paymentResponse.transaction_amount);
      
      // Marcar a transação como processada para evitar futuros incrementos
      await transactionRepository.updateTransactionStatus({
        paymentId: paymentResponse.id.toString(),
        status: updatedTransaction.status, // Inclui o status atual
        isProcessed: true, // Atualiza o campo para indicar que já foi processado
      });
    }

    delete updatedTransaction.paymentId;
    console.log("Transação final após remoção do paymentId:", updatedTransaction);

    return updatedTransaction;
  } catch (error) {
    console.error('Erro ao processar notificação de pagamento:', error);
    throw new Error(`Erro ao processar notificação de pagamento: ${error.message}`);
  }
}