import 'reflect-metadata';
import 'express-async-errors';
import express, { Express } from 'express';
import cors from 'cors';
import { handleApplicationErrors } from './middlewares';
import {
  usersRouter,
  authenticationRouter,
  rouletteRouter,
  textRouter,
  skinRouter,
  raffleRouter,
  paymentRouter,
  transactionRouter
} from './routers';
import { loadEnv, connectDb, disconnectDB } from './config';
import path from 'path';
import cron from 'node-cron';
import raffleService from './services/raffle-service'; // Importe o serviço onde a função clearExpiredReservations está

cron.schedule('* * * * *', async () => {
  console.log('Verificando reservas expiradas...');
  await raffleService.clearExpiredReservations();
});

loadEnv();

const uploadsDir = path.resolve(__dirname, '.', 'uploads');

const app = express();
app
  .use(cors())
  .use(express.json())
  .get('/health', (_req, res) => res.send('OK!'))
  .use('/users', usersRouter)
  .use('/auth', authenticationRouter)
  .use('/roulette', rouletteRouter)
  .use('/skin', skinRouter)
  .use('/text', textRouter)
  .use('/raffle', raffleRouter)
  .use('/payment', paymentRouter)
  .use('/transaction', transactionRouter)
  .use('/uploads', express.static(uploadsDir))
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
