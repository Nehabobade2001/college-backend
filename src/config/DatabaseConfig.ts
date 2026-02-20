import { Env } from '@/common/helpers/EnvHelper'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSourceOptions } from 'typeorm'
import './EnvConfig'
import * as path from 'path'

// Define the database configuration for the application
const config: DataSourceOptions = {
  type: 'mysql',
  host: Env.get('DB_HOST', 'localhost'),
  port: Env.get('DB_PORT', '3306'),
  username: Env.get('DB_USER', 'root'),
  password: Env.get('DB_PASSWORD', ''),
  database: Env.get('DB_NAME', 'recipes'),
  entities: [path.resolve(__dirname + '/../entities/*{.ts,.js}')],
  subscribers: [path.resolve(__dirname + '/../subscribers/*{.ts,.js}')],
  synchronize: false,
}

// Export the database configuration for the application
export const DatabaseConfig = TypeOrmModule.forRoot(config)
