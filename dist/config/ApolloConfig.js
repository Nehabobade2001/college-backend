"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApolloModule = void 0;
const GraphQLErrorHandling_1 = require("../common/helpers/GraphQLErrorHandling");
const inlineTrace_1 = require("@apollo/server/plugin/inlineTrace");
const default_1 = require("@apollo/server/plugin/landingPage/default");
const apollo_1 = require("@nestjs/apollo");
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
const upper_case_directive_1 = require("../common/directives/upper-case.directive");
exports.ApolloModule = graphql_1.GraphQLModule.forRoot({
    driver: apollo_1.ApolloFederationDriver,
    context: ({ req }) => ({ req }),
    autoSchemaFile: {
        federation: 2,
        path: 'src/schema.gql',
    },
    includeStacktraceInErrorResponses: false,
    transformSchema: (schema) => (0, upper_case_directive_1.upperDirectiveTransformer)(schema, 'upper'),
    installSubscriptionHandlers: false,
    playground: false,
    introspection: true,
    plugins: [
        (0, inlineTrace_1.ApolloServerPluginInlineTrace)(),
        process.env.NODE_ENV === 'production'
            ? (0, default_1.ApolloServerPluginLandingPageProductionDefault)()
            : (0, default_1.ApolloServerPluginLandingPageLocalDefault)({ embed: true }),
    ],
    buildSchemaOptions: {
        directives: [
            new graphql_2.GraphQLDirective({
                name: 'upper',
                locations: [graphql_2.DirectiveLocation.FIELD_DEFINITION],
            }),
        ],
    },
    csrfPrevention: false,
    formatError: (error) => {
        try {
            const errorDetails = JSON.parse(error.message);
            return {
                message: 'Validation failed',
                extensions: {
                    code: 'BAD_USER_INPUT',
                    errors: errorDetails,
                },
            };
        }
        catch {
            if (error.extensions.code === 'BAD_USER_INPUT') {
                return {
                    message: 'Validation failed',
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        errors: (0, GraphQLErrorHandling_1.parseBadUserInput)(error.message),
                    },
                };
            }
            else {
                return {
                    message: error.message,
                    extensions: {
                        code: error.extensions.code,
                    },
                };
            }
        }
    },
});
//# sourceMappingURL=ApolloConfig.js.map