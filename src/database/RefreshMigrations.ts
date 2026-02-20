import { Logger } from '@nestjs/common'
import { DataSource } from 'typeorm'
import * as os from 'os'
import * as util from 'util'
import { exec } from 'child_process'
import * as seeders from '@/database/seeders/index' // Import all seeders
import AppDataSource from '@/config/DataSource'
import { existsSync, mkdirSync } from 'fs'

const execAsync = util.promisify(exec)

async function RunMigrations() {
  const dataSource: DataSource = AppDataSource

  try {
    const shouldSeed = process.argv.includes('--seed')

    // Initialize the connection
    await dataSource.initialize()
    Logger.log('Database connected successfully...', 'Migration')

    try {
      // Export database before dropping
      await exportDatabase()
    } catch (e) {
      console.log('export db error', e)
    }
    Logger.log('Dropping the database...', 'Migration')
    await dataSource.dropDatabase()
    Logger.log('Database dropped successfully...', 'Migration')

    // Run migrations
    const pendingMigrations = await dataSource.runMigrations({
      transaction: 'all',
    })

    if (pendingMigrations.length > 0) {
      Logger.log(
        `Running ${pendingMigrations.length} migrations...`,
        'Migration',
      )
      pendingMigrations.forEach((migration, i) => {
        Logger.log(`#${i + 1}: ${migration.name} has been run...`, 'Migration')
      })
    } else {
      Logger.log('No pending migrations to run.', 'Migration')
    }

    Logger.log('Migrations successfully refreshed.', 'Migration')

    // Run seeders if --seed flag is present
    if (shouldSeed) {
      await seed(dataSource)
    }
  } catch (error) {
    Logger.error('Error refreshing migrations:', error?.stack, 'Migration')
  } finally {
    // Close the connection
    await dataSource.destroy()
  }
}

// Function to export the database
const exportDatabase = async () => {
  try {
    const isWindows = os.platform() === 'win32'

    console.log(isWindows, 'isWin')

    // check if the backup directory exists and create it if it doesn't
    const backupDir = 'src/database/backup'
    if (!existsSync(backupDir)) {
      mkdirSync(backupDir, { recursive: true })
    }

    const exportFileName = `src/database/backup/database_backup_${new Date()
      .toISOString()
      .replace(/[:.]/g, '-')}.sql`

    // Check if mysqldump is available
    const checkCommand = isWindows ? 'where mysqldump' : 'which mysqldump'

    console.log(checkCommand, 'checkCommand')
    await execAsync(checkCommand)

    // Construct export command based on the OS
    const command = isWindows
      ? `mysqldump -u ${process.env.DB_USER} -p ${process.env.DB_PASSWORD} -h ${process.env.DB_HOST} ${process.env.DB_NAME} > ${exportFileName}`
      : `mysqldump -u ${process.env.DB_USER} -p ${process.env.DB_PASSWORD} -h ${process.env.DB_HOST} ${process.env.DB_NAME} > ${exportFileName}`

    Logger.log(`Exporting database to file: ${exportFileName}`, 'Export')

    // Execute the export command
    await execAsync(command)

    Logger.log('Database exported successfully.', 'Export')
  } catch (error) {
    Logger.error('Error exporting the database:', error?.stack, 'Export')
    throw error
  }
}

const seed = async (dataSource: DataSource) => {
  try {
    Logger.log(`Running ${Object.keys(seeders).length} seeders...`, 'Seeder')

    for (const seeder of Object.values(seeders)) {
      await seeder(dataSource)
      Logger.log(`${seeder.name} executed successfully.`, 'Seeder')
    }

    Logger.log('Seeders executed successfully.', 'Seeder')
  } catch (error: any) {
    Logger.error('Error running seeders:', error?.stack, 'Seeder')
  }
}

// Execute the migrations
RunMigrations()
