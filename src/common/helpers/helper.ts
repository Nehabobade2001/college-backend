/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { renameSync, unlinkSync } from 'fs'
import { DateTime } from 'luxon'
import { join } from 'path'
const Handlebars = require('handlebars')
import { Type } from '@nestjs/common'
import { createUnionType } from '@nestjs/graphql'

// Check if file is a temporary file directory
export const isTempFile = (url: string): boolean =>
  url.startsWith('/public/temp')

// Check if file is an uploaded file directory
export const isUploadFile = (url: string): boolean =>
  url.startsWith('/public/uploads')

// Move file from temp to uploads directory in gateway
export const moveFile = async (oldPath: string) => {
  try {
    const file = oldPath.split('/')
    const fileName = file[file.length - 1]

    const oldFilePath = join(
      __dirname,
      '../../../../gateway/public/temp',
      fileName,
    )

    // Correctly resolving the new file path
    const newFilePath = join(
      __dirname,
      '../../../../gateway/public/uploads',
      fileName,
    )

    console.log('Moving file:', { oldFilePath, newFilePath })

    // Rename file (move operation)
    renameSync(oldFilePath, newFilePath)

    return `/public/uploads/${fileName}`
  } catch (error) {
    console.error('Error moving file:', error)
    throw new Error('Failed to move file')
  }
}

// Delete file from temp disk
export const deleteFile = (path: string) => {
  // Delete file from disk
  console.log(join(process.cwd(), path), 'path')
  unlinkSync(join(process.cwd(), path))
}

// Check if value is valid
export const isValid = (value: any) => {
  if (value === null || value === undefined) {
    return false
  }

  if (typeof value === 'string' && value.trim() === '') {
    return false
  }

  if (typeof value === 'number' && isNaN(value)) {
    return false
  }

  return true
}

// Format date
export const formatDate = (date: Date, format: string) => {
  return DateTime.fromJSDate(date).toFormat(format)
}

// function to capitalize first letter of a string
export const capitalized = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// return given date with current time
export const getDateTime = (date: string) => {
  const currentDateWithTime = DateTime.now()

  // replace given date with current time
  return currentDateWithTime
    .set({
      year: DateTime.fromISO(date).year,
      month: DateTime.fromISO(date).month,
      day: DateTime.fromISO(date).day,
    })
    .toJSDate()
}

// Format Indian currency
export const formatIndian = (number: number, currency: boolean = false) => {
  return number?.toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    style: currency ? 'currency' : 'decimal',
    currency: 'INR',
  })
}

// Register handlebars helpers for use in templates
Handlebars.registerHelper('increment', function (index: number) {
  return index + 1
})

Handlebars.registerHelper(
  'formatIndian',
  function (number: number, currency = false) {
    return formatIndian(number, currency)
  },
)

// function to convert timestamp into local time
export const convertToLocalTime = (timestamp: number) => {
  return DateTime.fromMillis(timestamp).toLocal().toISO()
}

export const isValidExtensions = (ext: any, allowedExtensions: string[]) => {
  return allowedExtensions.includes(ext)
}

// function to create a union type for GraphQL
export function createSmartUnion<TItem, TArray>(
  name: string,
  singleType: () => Type<TItem>,
  arrayType: () => Type<TArray>,
  arrayKey: keyof TArray = 'items' as keyof TArray,
  itemKey: keyof TItem = 'id' as keyof TItem,
) {
  return createUnionType({
    name,
    types: () => [singleType(), arrayType()] as const,
    resolveType(value: any) {
      if (Array.isArray(value?.[arrayKey])) return arrayType()
      if (value?.[itemKey]) return singleType()
      return null
    },
  })
}
