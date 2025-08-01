import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';

import { unauthorizedError } from '../errors';
import { prisma } from '../config';

export async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.header('Authorization');
  console.log(req.body)

  if (!authHeader) return generateUnauthorizedResponse(res);
  const token = authHeader.split(' ')[1];
  if (!token) return generateUnauthorizedResponse(res);

  try {
    jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

    const session = await prisma.session.findFirst({
      where: {
        token,
      },
    });
    if (!session) return generateUnauthorizedResponse(res);
    const user = await prisma.user.findUnique({
      where: { id: session.user_id },
    });
    req.isAdmin = user.isAdmin
    req.userId = session.user_id;
    return next();
  } catch (err) {
    return generateUnauthorizedResponse(res);
  }
}

function generateUnauthorizedResponse(res: Response) {
  res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError());
}

export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
  userId: number;
  isAdmin?: boolean;
};
