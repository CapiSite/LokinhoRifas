import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import { prisma } from '../config';
import { AuthenticatedRequest } from './authentication-middleware';

export async function authenticateAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const userId = req.userId;
  if (!userId) {
    return res.status(httpStatus.UNAUTHORIZED).send({
      error: "Acesso negado. Não foi possível verificar o usuário."
    });
  }  

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    req.isAdmin = user.isAdmin

    if (!user || !user.isAdmin) {
      return res.status(httpStatus.FORBIDDEN).send({
        error: "Acesso negado. Requer privilégios administrativos."
      });
    }

    return next();
  } catch (err) {
    console.log("Erro interno do servidor ao verificar privilégios administrativos.")
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "Erro interno do servidor ao verificar privilégios administrativos."
    });
  }
}
