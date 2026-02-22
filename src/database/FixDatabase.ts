import { Logger } from '@nestjs/common'
import * as mysql from 'mysql2/promise'
import '@/config/EnvConfig'

async function FixDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
  })

  try {
    const dbName = process.env.DB_NAME
    
    Logger.log('Removing orphaned tablespace files...', 'FixDatabase')
    
    // Get list of orphaned .ibd files
    const [files]: any = await connection.query(
      `SELECT file_name FROM information_schema.innodb_sys_tablespaces WHERE name LIKE '${dbName}/%'`
    )
    
    Logger.log(`Found ${files.length} tablespace files`, 'FixDatabase')
    
    // Drop database with force
    Logger.log('Dropping database...', 'FixDatabase')
    await connection.query(`DROP DATABASE IF EXISTS ${dbName}`)
    
    Logger.log('Creating database...', 'FixDatabase')
    await connection.query(`CREATE DATABASE ${dbName} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`)
    
    Logger.log('Database fixed successfully!', 'FixDatabase')
  } catch (error) {
    Logger.error('Error fixing database:', error?.stack, 'FixDatabase')
    Logger.log('\nManual fix required:', 'FixDatabase')
    Logger.log('1. Open MySQL Workbench', 'FixDatabase')
    Logger.log('2. Run: DROP DATABASE collage;', 'FixDatabase')
    Logger.log('3. Run: CREATE DATABASE collage CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;', 'FixDatabase')
    Logger.log('4. Run: npm run migration:run:seed', 'FixDatabase')
  } finally {
    await connection.end()
  }
}

FixDatabase()
