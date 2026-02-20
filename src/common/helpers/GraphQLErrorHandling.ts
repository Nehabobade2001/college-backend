/* eslint-disable no-useless-escape */
import { GraphQLError } from 'graphql'
import { ErrorCodes, getEnumKeyValuePairs } from '../const/ErrorCodes'
import Handlebars from 'handlebars'

export const throwGqlError = (
  code: ErrorCodes,
  args?: {
    [key: string]: string | number
  },
) => {
  const error = getEnumKeyValuePairs(ErrorCodes).find(
    (error) => error.value === (code as unknown as string),
  )

  if (args) {
    // compile with Handlebars
    const template = Handlebars.compile(error.value)

    throw new GraphQLError(template(args), {
      extensions: {
        code: error.key,
      },
    })
  } else {
    throw new GraphQLError(error.value, {
      extensions: {
        code: error.key,
      },
    })
  }
}

export const parseBadUserInput = (error: string) => {
  const regex = /(?:Field \"([^\"]+)\" (.+)|at \"([^\"]+)\"; (.+))/g

  const errors = [...error.matchAll(regex)].reduce((acc, match) => {
    const field = match[1] || match[3] // Extract field name (from either group)
    const error = match[2] || match[4] // Extract error message (from either group)

    const d = field.replaceAll('data.', '')
    const e = error.replaceAll('of ', '').replaceAll('is ', '').trim()
    acc[d] = e
    return acc
  }, {})

  return errors
}
