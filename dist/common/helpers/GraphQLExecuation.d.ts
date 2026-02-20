import { ArgumentsHost } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
export declare class DynamicGraphQLExceptionFilter implements GqlExceptionFilter {
    catch(exception: GraphQLError, host: ArgumentsHost): GraphQLError;
}
