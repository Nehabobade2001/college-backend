import { Logger } from '@nestjs/common'
import * as dotenv from 'dotenv'
import * as path from 'path'

// get the environment file based on the current environment
const envFile = `.env.${process.env.NODE_ENV || 'development'}`

// Load environment variables from file
dotenv.config({ path: path.resolve(process.cwd(), envFile) })

// Log the loaded environment file
Logger.log(`Loading environments from ${envFile}`, 'EnvConfig')
