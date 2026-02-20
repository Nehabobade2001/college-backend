/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-require-imports */
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import mjml2html = require('mjml')

export class MJMLAdapter extends HandlebarsAdapter {
  compile(mail: any, callback: any, options: any): void {
    if (mail.data.html) {
      super.compile(mail, callback, options)
    } else {
      super.compile(
        mail,
        () => {
          const regex = /<mjml\b[^>]*>(.*?)<\/mjml>/s
          const match = mail?.data?.html?.match(regex)
          if (match) {
            const contentBetweenMjml = match[1]
            mail.data.html = mjml2html(
              '<mjml>' + contentBetweenMjml + '</mjml>mjml>',
            ).html
          } else {
            console.log('No match found')
          }
          callback()
        },
        options,
      )
    }
  }
}
