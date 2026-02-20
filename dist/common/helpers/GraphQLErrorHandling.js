"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBadUserInput = exports.throwGqlError = void 0;
const graphql_1 = require("graphql");
const ErrorCodes_1 = require("../const/ErrorCodes");
const handlebars_1 = __importDefault(require("handlebars"));
const throwGqlError = (code, args) => {
    const error = (0, ErrorCodes_1.getEnumKeyValuePairs)(ErrorCodes_1.ErrorCodes).find((error) => error.value === code);
    if (args) {
        const template = handlebars_1.default.compile(error.value);
        throw new graphql_1.GraphQLError(template(args), {
            extensions: {
                code: error.key,
            },
        });
    }
    else {
        throw new graphql_1.GraphQLError(error.value, {
            extensions: {
                code: error.key,
            },
        });
    }
};
exports.throwGqlError = throwGqlError;
const parseBadUserInput = (error) => {
    const regex = /(?:Field \"([^\"]+)\" (.+)|at \"([^\"]+)\"; (.+))/g;
    const errors = [...error.matchAll(regex)].reduce((acc, match) => {
        const field = match[1] || match[3];
        const error = match[2] || match[4];
        const d = field.replaceAll('data.', '');
        const e = error.replaceAll('of ', '').replaceAll('is ', '').trim();
        acc[d] = e;
        return acc;
    }, {});
    return errors;
};
exports.parseBadUserInput = parseBadUserInput;
//# sourceMappingURL=GraphQLErrorHandling.js.map