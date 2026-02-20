/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ErrorCodes } from '@/common/const/ErrorCodes'
import { throwGqlError } from '@/common/helpers/GraphQLErrorHandling'
import { isValidExtensions } from '@/common/helpers/helper'
import { MultipartFile } from '@fastify/multipart'
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import {
  createWriteStream,
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
  unlinkSync,
} from 'fs'
import { extname, join } from 'path'
import { pipeline } from 'stream/promises'
import { fileTypeFromBuffer } from 'file-type'

@Injectable()
export class FileUploadService implements OnModuleInit, OnModuleDestroy {
  private tempPath = join(__dirname, '../../../../gateway/public/temp')

  private cleanupInterval: NodeJS.Timeout | null = null

  private allowedExtensions = [
    'png',
    'jpg',
    'webp',
    'avif',
    'jpeg',
    'pdf',
    'xls',
    'xlsx',
    'txt',
    'doc',
    'docx',
  ]

  private maxFileSize = 20 * 1024 * 1024 // 20MB Limit

  constructor() {
    if (!existsSync(this.tempPath)) {
      mkdirSync(this.tempPath, { recursive: true }) // Ensure upload directory exists
    }
  }

  // Periodic Cleanup in Every 72 Hours
  onModuleInit() {
    this.cleanupInterval = setInterval(
      () => this.cleanOldFiles(),
      3 * 24 * 60 * 60 * 1000,
    )
  }

  onModuleDestroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval)
    }
  }

  // Save File
  async saveFile(file: MultipartFile): Promise<string> {
    let filePath: string | null = null // Track the file path for cleanup
    try {
      // Step 0: Check if file is empty
      if (!file.filename) {
        throwGqlError(ErrorCodes.NO_FILE_FOUND)
      }

      // Step 1: Generate Unique Filename
      const filename = `${Date.now()}${extname(file.filename)}`
      filePath = join(this.tempPath, filename)
      const writeStream = createWriteStream(filePath, { flags: 'w' })

      // Step 2: Stream the file directly to disk
      await pipeline(file.file, writeStream).catch((err) => {
        throw Error(`Pipeline error: ${err}`)
      })

      // Step 3: Verify the saved file size
      const savedFileSize = statSync(filePath).size

      if (savedFileSize === 0) {
        throwGqlError(ErrorCodes.ZERO_BYTE_FILE)
      }

      if (savedFileSize > this.maxFileSize) {
        throwGqlError(ErrorCodes.INVALID_FILE_SIZE)
      }

      // Step 4: Validate File Type (Optional)
      const fileBuffer = await this.getFileBuffer(filePath)
      const detectedType = await this.getFileType(fileBuffer)

      // Step 5: Validate MIME Type
      const ext = detectedType?.ext || extname(file.filename).replace('.', '')
      if (!isValidExtensions(ext, this.allowedExtensions)) {
        throwGqlError(ErrorCodes.INVALID_FILE_TYPE, {
          type: ext,
          name: file.filename,
          allowed: this.allowedExtensions.join(', '),
        })
      }

      // Return file URL (Ensure proper access to public folder)
      return `/public/temp/${filename}`
    } catch (error) {
      // Clean up the file if it was partially uploaded
      if (filePath && existsSync(filePath)) {
        unlinkSync(filePath) // Delete the file
        console.log(`Deleted partially uploaded file: ${filePath}`)
      }
      // Re-throw the error to propagate it to the client
      throw error
    }
  }

  // ✅ Read file from disk into buffer (for validation)
  private async getFileBuffer(filePath: string): Promise<Buffer> {
    const fs = require('fs').promises
    return fs.readFile(filePath)
  }

  // Detect file type using file-type library
  private async getFileType(file: Buffer) {
    return fileTypeFromBuffer(file) // ✅ Corrected method call
  }

  // Cleanup Old Files
  private cleanOldFiles() {
    try {
      const files = readdirSync(this.tempPath)
      const now = Date.now()

      files.forEach((file) => {
        const filePath = join(this.tempPath, file)
        const fileStat = statSync(filePath)

        // Delete Files Older Than 72 Hours
        if (now - fileStat.mtime.getTime() >= 3 * 24 * 60 * 60 * 1000) {
          try {
            unlinkSync(filePath)
            console.log(`Deleted old file: ${file}`)
          } catch (err) {
            console.error(`Error deleting file ${file}:`, err)
          }
        }
      })
    } catch (err) {
      console.error('Error cleaning old files:', err)
    }
  }
}
