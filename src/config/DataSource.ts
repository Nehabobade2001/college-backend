import { DataSource, DataSourceOptions } from 'typeorm'
import { Env } from '../common/helpers/EnvHelper' // do not add @ here
import './EnvConfig' // do not add @ here

// Define the database configuration for the application
const config: DataSourceOptions = {
  type: 'mysql',
  host: Env.get('DB_HOST', 'localhost'),
  port: Env.get('DB_PORT', '3306'),
  username: Env.get('DB_USER', 'root'),
  password: Env.get('DB_PASSWORD', ''),
  database: Env.get('DB_NAME', 'recipes'),
  entities: ['./src/entities/*.ts'],
  migrations: ['./src/database/migrations/*.ts'],
  synchronize: false,
}

// Separate the database configuration for migrations
const AppDataSource = new DataSource(config)

// Export the data source for migrations
export default AppDataSource
