"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicGraphQLExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("graphql");
let DynamicGraphQLExceptionFilter = class DynamicGraphQLExceptionFilter {
    catch(exception, host) {
        const { message, extensions } = exception;
        if (extensions?.code === 'BAD_USER_INPUT') {
            const missingFieldMatch = message.match(/Field "(\w+)" of required type/);
            if (missingFieldMatch && missingFieldMatch[1]) {
                const missingField = missingFieldMatch[1];
                return new graphql_1.GraphQLError(`The "${missingField}" field is required and must be provided.`, exception.nodes, exception.source, exception.positions, exception.path, exception.originalError, {
                    ...extensions,
                    code: 'MISSING_FIELD',
                });
            }
        }
        return exception;
    }
};
exports.DynamicGraphQLExceptionFilter = DynamicGraphQLExceptionFilter;
exports.DynamicGraphQLExceptionFilter = DynamicGraphQLExceptionFilter = __decorate([
    (0, common_1.Catch)(graphql_1.GraphQLError)
], DynamicGraphQLExceptionFilter);
//# sourceMappingURL=GraphQLExecuation.js.map