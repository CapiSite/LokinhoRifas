import { Prisma, PrismaClient } from '@prisma/client';
import { prisma } from '../../config';

interface TransactionData {
  userId: number;
  paymentId: string;
  status: string;
  statusDetail?: string;
  paymentMethod: string;
  transactionAmount: number;
  dateApproved?: Date | null;
  qrCode?: string | null; // Novo campo para QR code
  qrCodeBase64?: string | null; // Novo campo para QR code em base64
}

interface TransactionUpdateData {
  paymentId: string;
  status: string;
  statusDetail?: string;
  dateApproved?: Date | null;
}

async function createTransactionMeli(data: TransactionData) {
  return prisma.transaction.create({
    data: {
      user_id: data.userId,
      paymentId: data.paymentId,
      status: data.status,
      status_detail: data.statusDetail,
      paymentMethod: data.paymentMethod,
      transactionAmount: data.transactionAmount,
      dateApproved: data.dateApproved,
      type: 'credit',
      qrCode: data.qrCode, // Salva o QR code
      qrCodeBase64: data.qrCodeBase64, // Salva o QR code em base64
    },
  });
}

async function updateTransactionStatus(data: {
  paymentId: string;
  status: string;
  statusDetail?: string;
  dateApproved?: Date | null;
  isProcessed?: boolean; // Permite atualizar o campo de controle
}) {
  return prisma.transaction.update({
    where: { paymentId: data.paymentId },
    data: {
      status: data.status,
      status_detail: data.statusDetail,
      dateApproved: data.dateApproved,
      isProcessed: data.isProcessed,
    },
  });
}

async function getTransactionById(userId: number) {
  const transactions = await prisma.transaction.findMany({
    where: {
      user_id: userId,
    },
    include: {
      raffle: {
        select: {
          name: true,
        },
      },
    },
  });

  // Remove o campo paymentId de cada transação, se necessário
  transactions.forEach((transaction) => {
    delete transaction.paymentId;
  });

  return transactions;
}

async function createTransaction(data: Prisma.TransactionCreateInput, prismaInstance: PrismaClient = prisma) {
  return prismaInstance.transaction.create({
    data,
  });
}

async function getTransactionByPaymentId(paymentId: string) {
  return prisma.transaction.findUnique({
    where: { paymentId },
  });
}

const transactionRepository = {
  createTransactionMeli,
  createTransaction,
  updateTransactionStatus,
  getTransactionById,
  getTransactionByPaymentId
};

export default transactionRepository;