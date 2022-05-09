import express from 'express'

import { SubmitFeedbackUseCase } from './usecases/submitFeedbackUseCase';
import { PrismaFeedbackRepository } from './repositories/prisma/prismaFeedbacksRepository';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';


export const routes = express.Router()



routes.post('/feedbacks', async (req, res) => {
    const {type, comment, screenshot} = req.body

    const nodemailerMailAdapter = new NodemailerMailAdapter()
    
    const prismaFeedbacksRepository = new PrismaFeedbackRepository()
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepository, nodemailerMailAdapter)

    await submitFeedbackUseCase.execute({
        type, comment, screenshot
    })

    

    return res.status(201).send()
})