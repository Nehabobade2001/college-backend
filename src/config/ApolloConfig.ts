/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { parseBadUserInput } from '@/common/helpers/GraphQLErrorHandling'
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace'
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default'
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo'
import { GraphQLModule } from '@nestjs/graphql'
import { DirectiveLocation, GraphQLDirective } from 'graphql'
import { upperDirectiveTransformer } from 'src/common/directives/upper-case.directive'

export const ApolloModule = GraphQLModule.forRoot<ApolloFederationDriverConfig>(
  {
    driver: ApolloFederationDriver,
    context: ({ req }) => ({ req }),
    autoSchemaFile: {
      federation: 2,
      path: 'src/schema.gql',
    },
    includeStacktraceInErrorResponses: false,
    transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
    installSubscriptionHandlers: false,
    playground: false,
    introspection: true,
    plugins: [
      ApolloServerPluginInlineTrace(),
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageProductionDefault() // Use production landing page
        : ApolloServerPluginLandingPageLocalDefault({ embed: true }), // Use Apollo Sandbox in development
    ],
    buildSchemaOptions: {
      directives: [
        new GraphQLDirective({
          name: 'upper',
          locations: [DirectiveLocation.FIELD_DEFINITION],
        }),
      ],
    },
    csrfPrevention: false,
    formatError: (error) => {
      try {
        const errorDetails = JSON.parse(error.message)
        return {
          message: 'Validation failed',
          extensions: {
            code: 'BAD_USER_INPUT',
            errors: errorDetails,
          },
        }
      } catch {
        if (error.extensions.code === 'BAD_USER_INPUT') {
          return {
            message: 'Validation failed',
            extensions: {
              code: 'BAD_USER_INPUT',
              errors: parseBadUserInput(error.message),
            },
          }
        } else {
          return {
            message: error.message,
            extensions: {
              code: error.extensions.code,
            },
          }
        }
      }
    },
  },
)
