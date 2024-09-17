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
  qrCode?: string | null;
  qrCodeBase64?: string | null;
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
      qrCode: data.qrCode,
      qrCodeBase64: data.qrCodeBase64,
    },
  });
}

async function updateTransactionStatus(data: TransactionUpdateData) {
  return prisma.transaction.update({
    where: {
      paymentId: data.paymentId,
    },
    data: {
      status: data.status,
      status_detail: data.statusDetail,
      dateApproved: data.dateApproved,
    },
  });
}

async function getTransactionById(userId: number) {
  const transactions = await prisma.transaction.findMany({
    where: {
      user_id: userId,
    },
  });

  transactions.map((transaction) => {
    delete transaction.paymentId;
  });

  return transactions;
}

async function createTransaction(data: Prisma.TransactionCreateInput, prismaInstance: PrismaClient = prisma) {
  return prismaInstance.transaction.create({
    data,
  });
}

const transactionRepository = {
  createTransactionMeli,
  createTransaction,
  updateTransactionStatus,
  getTransactionById,
};

export default transactionRepository;
