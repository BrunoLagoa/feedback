import express from 'express';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const routes = express.Router();

routes.get('/', (req, res) => {
  return res.status(200).json({ message: 'API feedbacks' });
});

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  try {
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter();

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
      prismaFeedbacksRepository,
      nodemailerMailAdapter
    );

    await submitFeedbackUseCase.execute({ type, comment, screenshot });

    return res.status(201).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});
