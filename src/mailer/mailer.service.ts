import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private logger = new Logger('EmailService');

  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GOOGLE_EMAIL,
      pass: process.env.GOOGLE_PASSWORD,
    },
  });

  async sendTableInfo(email: string): Promise<void> {
    const htmlContent = `
      <h2>Повідомлення про оновлення таблиці</h2>
      <p>До таблиці було додано 10 нових рядків.</p>
      <p>Зазначене оновлення таблиці успішно виконано.</p>
    `;

    const mailOptions = {
      from: process.env.GOOGLE_EMAIL,
      to: email,
      subject: 'Оновлення таблиці: додано нові рядки',
      html: htmlContent,
    };

    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        this.logger.error(`Помилка надсилання листа: ${error}`);
      } else {
        this.logger.log(`Лист надіслано на ${email}: ${info.response}`);
      }
    });
  }
}
