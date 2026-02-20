import { EnvTypes } from 'env'

export class Env {
  static get<T = string>(key: keyof EnvTypes, defaultValue: string): T {
    return (process.env[key] || defaultValue) as T
  }
}
