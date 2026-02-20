import { EnvTypes } from 'env';
export declare class Env {
    static get<T = string>(key: keyof EnvTypes, defaultValue: string): T;
}
