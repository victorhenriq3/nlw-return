import { MailAdapter, SendEmailData } from "../mail-adapter";

import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c074d80196a994",
      pass: "bb15cf3492570c"
    }
  });

export class NodemailerMailAdapter implements MailAdapter{
    async sendMail({subject, body}: SendEmailData){
        await transport.sendMail({
            from: 'Equipe Feedback <oi@feedget.com>',
            to: "Victor Henrique <vic.1601@outlook.com>",
            subject,
            html: body
        })
    }
}