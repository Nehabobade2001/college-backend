import { ArgumentsHost, Catch } from '@nestjs/common'
import { GqlExceptionFilter } from '@nestjs/graphql'
import { GraphQLError } from 'graphql'

@Catch(GraphQLError)
export class DynamicGraphQLExceptionFilter implements GqlExceptionFilter {
  catch(exception: GraphQLError, host: ArgumentsHost) {
    const { message, extensions } = exception

    // Check if it's a BAD_USER_INPUT error
    if (extensions?.code === 'BAD_USER_INPUT') {
      // Regex to capture the missing field name from the error message
      const missingFieldMatch = message.match(/Field "(\w+)" of required type/)

      // If a missing field is found in the message
      if (missingFieldMatch && missingFieldMatch[1]) {
        const missingField = missingFieldMatch[1] // The field that is missing

        // Customize the error message dynamically based on the missing field
        return new GraphQLError(
          `The "${missingField}" field is required and must be provided.`,
          exception.nodes,
          exception.source,
          exception.positions,
          exception.path,
          exception.originalError,
          {
            ...extensions,
            code: 'MISSING_FIELD', // Custom error code if needed
          },
        )
      }
    }

    // Default behavior for other errors
    return exception
  }
}
