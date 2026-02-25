import { Controller, All, Req, Res, HttpStatus } from '@nestjs/common'
import { Request, Response } from 'express'

@Controller()
export class NotFoundController {
  @All('*')
  handleNotFound(@Req() req: Request, @Res() res: Response) {
    return res.status(HttpStatus.NOT_FOUND).json({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Not Found',
      path: req.originalUrl,
    })
  }
}
