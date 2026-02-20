import { ErrorCodes } from '../const/ErrorCodes';
export declare const throwGqlError: (code: ErrorCodes, args?: {
    [key: string]: string | number;
}) => never;
export declare const parseBadUserInput: (error: string) => {};
