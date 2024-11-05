import httpStatus from 'http-status';
import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares';
import transactionService from '../services/transaction-service';

export const getTransaction = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.userId
        const transactions = await transactionService.getTransactions(Number(userId));
        console.log(transactions)
        res.status(httpStatus.OK).send(transactions);
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Erro ao buscar texto", error });
    }
};
