import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  // Send Welcome Email after successful registration
  async welcomeMail(to: string, user: object, setting: object): Promise<void> {
    await this.mailerService
      .sendMail({
        to, // list of receivers
        // from: 'noreply@nestjs.com', // sender address
        subject:
          'Welcome Mail for Successful Registration in Nest MailerModule ✔', // Subject line
        template: 'Welcome.hbs',
        context: {
          user,
          setting,
        },
      })
      .then(() => {
        console.log('Email sent')
      })
      .catch((e) => {
        console.log('Email failed', e)
      })
  }

  // Send Welcome Email with attachments (e.g., credentials file)
  async sendWelcomeWithAttachment(
    to: string,
    user: object,
    setting: object,
    attachments: Array<{ filename: string; content: string | Buffer }>,
  ): Promise<void> {
    await this.mailerService
      .sendMail({
        to,
        subject: 'Welcome - Account Created',
        template: 'Welcome.hbs',
        context: {
          user,
          setting,
        },
        attachments,
      })
      .then(() => {
        console.log('Email with attachment sent')
      })
      .catch((e) => {
        console.log('Email with attachment failed', e)
      })
  }

  // Send Email for registration Process
  async sendMailVerify(
    code: number,
    to: string,
    setting: object,
    user: object,
  ): Promise<void> {
    await this.mailerService
      .sendMail({
        to, // list of receivers
        // from: 'noreply@nestjs.com', // sender address
        subject: 'Verification Email OTP in Nest MailerModule ✔', // Subject line
        template: 'VerifyEmail.hbs',
        context: {
          code,
          email: to,
          setting,
          user,
        },
      })
      .then(() => {
        console.log('Email with OTP sent')
      })
      .catch((e) => {
        console.log('Email failed', e)
      })
  }

  // Send Login Email
  async sendOtpMail(
    code: number,
    to: string,
    user: object,
    setting: object,
  ): Promise<void> {
    await this.mailerService
      .sendMail({
        to, // list of receivers
        // from: 'noreply@nestjs.com', // sender address
        subject:
          'Testing Meeting - Follow - UP for Meeting in Nest MailerModule ✔', // Subject line
        template: 'RequestOtp.hbs',
        context: {
          code,
          user,
          setting,
        },
      })
      .then(() => {
        console.log('Email with OTP sent')
      })
      .catch((e) => {
        console.log('Email failed', e)
      })
  }

  // Send Email for forgot password
  async sendForgotPasswordMail(
    code: number,
    to: string,
    user: object,
    setting: object,
  ): Promise<void> {
    await this.mailerService
      .sendMail({
        to, // list of receivers
        // from: '
        subject: 'Forgot Password OTP in Nest MailerModule ✔', // Subject line
        template: 'ForgotPassword.hbs',
        context: {
          code,
          user,
          setting,
        },
      })
      .then(() => {
        console.log('Email with OTP sent in meeting')
      })
      .catch((e) => {
        console.log('Email failed ', e)
      })
  }
}
