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
  let isConnected = false

  try {
    const shouldSeed = process.argv.includes('--seed')

    // Initialize the connection
    await dataSource.initialize()
    isConnected = true
    Logger.log('Database connected successfully...', 'Migration')

    try {
      // Export database before dropping
      await exportDatabase()
    } catch (e) {
      Logger.warn('Database export skipped', 'Export')
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
    process.exit(1)
  } finally {
    // Close the connection only if it was established
    if (isConnected) {
      await dataSource.destroy()
    }
  }
}

// Function to export the database
const exportDatabase = async () => {
  try {
    const isWindows = os.platform() === 'win32'

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
    await execAsync(checkCommand)

    // Construct export command based on the OS
    const password = process.env.DB_PASSWORD
    const passwordFlag = password ? `-p${password}` : ''
    
    const command = `mysqldump -u ${process.env.DB_USER} ${passwordFlag} -h ${process.env.DB_HOST} ${process.env.DB_NAME} > ${exportFileName}`

    Logger.log(`Exporting database to file: ${exportFileName}`, 'Export')

    // Execute the export command
    await execAsync(command)

    Logger.log('Database exported successfully.', 'Export')
  } catch (error) {
    Logger.warn('Database export failed - continuing without backup', 'Export')
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
