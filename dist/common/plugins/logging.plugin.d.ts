import { ApolloServerPlugin, GraphQLRequestListener } from '@apollo/server';
export declare class LoggingPlugin implements ApolloServerPlugin {
    requestDidStart(): Promise<GraphQLRequestListener<any>>;
}
