import { MailAdapter } from "../adapters/mail-adapter"
import { FeedbacksRepository } from "../repositories/FeedbacksRepository"
import { PrismaFeedbackRepository } from "../repositories/prisma/prismaFeedbacksRepository"

interface SubmitFeedbackUseCaseRequest{
    type: string
    comment: string
    screenshot?: string
}

export class SubmitFeedbackUseCase{
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter,
    ){}

    async execute(request: SubmitFeedbackUseCaseRequest){
        const {type, comment, screenshot} = request

        await this.feedbacksRepository.create({
            type,
            comment, 
            screenshot
        })

        await this.mailAdapter.sendMail({
            subject: 'Novo feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
                `<p>Tipo do feedback ${type}</p>`,
                `<p>Comentario do feedback ${comment}</p>`,
                `</div>`
            ].join('\n')
        })
    }
}