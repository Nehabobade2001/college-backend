import { Logger } from '@nestjs/common'
import * as mysql from 'mysql2/promise'
import '@/config/EnvConfig'

class DatabaseResetUtility {
  private connection: mysql.Connection
  private readonly dbName: string

  constructor() {
    this.dbName = process.env.DB_NAME || 'collage'
  }

  async connect(): Promise<void> {
    this.connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      multipleStatements: true,
    })
    Logger.log('Connected to MySQL server', 'DatabaseReset')
  }

  async resetDatabase(): Promise<void> {
    try {
      await this.connect()

      // Step 1: Drop all tables with foreign key checks disabled
      await this.dropAllTables()

      // Step 2: Attempt to drop and recreate database
      await this.recreateDatabase()

      Logger.log('✓ Database reset completed successfully', 'DatabaseReset')
      Logger.log(
        '\nNext step: Run "npm run migration:run:seed"',
        'DatabaseReset',
      )
    } catch (error) {
      Logger.error('✗ Database reset failed', error?.stack, 'DatabaseReset')
      this.printManualInstructions()
    } finally {
      await this.connection?.end()
    }
  }

  private async dropAllTables(): Promise<void> {
    try {
      await this.connection.query(`USE ${this.dbName}`)
      await this.connection.query('SET FOREIGN_KEY_CHECKS = 0')

      const [tables]: any = await this.connection.query(
        `SELECT table_name FROM information_schema.tables WHERE table_schema = ?`,
        [this.dbName],
      )

      if (tables.length > 0) {
        Logger.log(`Dropping ${tables.length} tables...`, 'DatabaseReset')

        for (const { table_name } of tables) {
          try {
            await this.connection.query(`DROP TABLE IF EXISTS ${table_name}`)
            Logger.log(`  ✓ Dropped table: ${table_name}`, 'DatabaseReset')
          } catch (error) {
            Logger.warn(
              `  ✗ Failed to drop table: ${table_name}`,
              'DatabaseReset',
            )
          }
        }
      }

      await this.connection.query('SET FOREIGN_KEY_CHECKS = 1')
    } catch (error) {
      Logger.warn('Could not drop tables', 'DatabaseReset')
    }
  }

  private async recreateDatabase(): Promise<void> {
    try {
      Logger.log('Dropping database...', 'DatabaseReset')
      await this.connection.query(`DROP DATABASE IF EXISTS ${this.dbName}`)

      Logger.log('Creating database...', 'DatabaseReset')
      await this.connection.query(
        `CREATE DATABASE ${this.dbName} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
      )
    } catch (error) {
      throw new Error(
        `Failed to recreate database: ${error.message}\nOrphaned tablespace files may exist.`,
      )
    }
  }

  private printManualInstructions(): void {
    Logger.log('\n' + '='.repeat(70), 'DatabaseReset')
    Logger.log('MANUAL FIX REQUIRED', 'DatabaseReset')
    Logger.log('='.repeat(70), 'DatabaseReset')
    Logger.log(
      '\nThe database has corrupted tablespace files (.ibd files).',
      'DatabaseReset',
    )
    Logger.log(
      'These must be manually removed. Follow these steps:\n',
      'DatabaseReset',
    )
    Logger.log('Option 1: Using MySQL Workbench (Recommended)', 'DatabaseReset')
    Logger.log('  1. Open MySQL Workbench', 'DatabaseReset')
    Logger.log('  2. Connect to your local MySQL server', 'DatabaseReset')
    Logger.log('  3. Open a new SQL tab', 'DatabaseReset')
    Logger.log('  4. Run these commands:', 'DatabaseReset')
    Logger.log('     DROP DATABASE collage;', 'DatabaseReset')
    Logger.log(
      '     CREATE DATABASE collage CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;',
      'DatabaseReset',
    )
    Logger.log('  5. Run: npm run migration:run:seed\n', 'DatabaseReset')

    Logger.log('Option 2: Manual File Deletion', 'DatabaseReset')
    Logger.log('  1. Stop MySQL service:', 'DatabaseReset')
    Logger.log('     net stop MySQL (run as Administrator)', 'DatabaseReset')
    Logger.log('  2. Navigate to MySQL data directory:', 'DatabaseReset')
    Logger.log(
      '     C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Data\\',
      'DatabaseReset',
    )
    Logger.log('     OR C:\\xampp\\mysql\\data\\ (if using XAMPP)', 'DatabaseReset')
    Logger.log('  3. Delete the "collage" folder', 'DatabaseReset')
    Logger.log('  4. Start MySQL service:', 'DatabaseReset')
    Logger.log('     net start MySQL (run as Administrator)', 'DatabaseReset')
    Logger.log('  5. Run: npm run db:fix', 'DatabaseReset')
    Logger.log('  6. Run: npm run migration:run:seed', 'DatabaseReset')
    Logger.log('='.repeat(70) + '\n', 'DatabaseReset')
  }
}

async function main() {
  const utility = new DatabaseResetUtility()
  await utility.resetDatabase()
}

main()
