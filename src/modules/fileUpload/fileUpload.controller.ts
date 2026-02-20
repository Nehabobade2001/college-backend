/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ErrorCodes } from '@/common/const/ErrorCodes'
import { Controller, Post, Req, Res } from '@nestjs/common'
import { FastifyReply, FastifyRequest } from 'fastify'
import { FileUploadService } from './fileUpload.service'
import { throwGqlError } from '@/common/helpers/GraphQLErrorHandling'

@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  // Files Upload
  @Post('upload')
  async uploadMultipleFiles(
    @Req() request: FastifyRequest,
    @Res() response: FastifyReply,
  ) {
    try {
      const fileIterator = request.files()
      const files = []

      for await (const file of fileIterator) {
        if (!file) {
          throwGqlError(ErrorCodes.NO_FILE_FOUND)
        }

        const fileUrl = await this.fileUploadService.saveFile(file)
        files.push(fileUrl)
      }
      // return
      return response.status(200).send({
        files: files,
        statusCode: 200,
        message: `${files.length > 1 ? 'Files uploaded successfully' : 'File uploaded successfully'}`,
      })
    } catch (error) {
      response.status(500).send({
        error: error.message,
        statusCode: 500,
      })
    }
  }
}
