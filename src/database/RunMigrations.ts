/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import AppDataSource from '@/config/DataSource'
import { Logger } from '@nestjs/common'
import { DataSource } from 'typeorm'
import * as seeders from '@/database/seeders/index' // Import all seeders

async function RunMigrations() {
  const dataSource: DataSource = AppDataSource

  try {
    const shouldSeed = process.argv.includes('--seed')

    // Initialize the connection
    await dataSource.initialize()

    Logger.log('Database connected successfully...', 'Migration')

    // Retrieve and log the list of migrations that are pending
    const pendingMigrations = await dataSource.runMigrations({
      transaction: 'all',
    })

    if (pendingMigrations.length > 0) {
      Logger.log(
        `Running ${pendingMigrations.length} pending migrations...`,
        'Migration',
      )
      pendingMigrations.forEach((migration, i) => {
        Logger.log(`#${i + 1}: ${migration.name} has been run...`, 'Migration')
      })
    } else {
      Logger.log('No pending migrations to run.', 'Migration')
    }

    Logger.log('Migrations Executed successfully.', 'Migration')

    // Run seeding if --seed flag is present
    if (shouldSeed) {
      await seed(dataSource)
    }
  } catch (error) {
    // console.log(error.stack)

    Logger.error('Error running migrations:', error?.stack, 'Migration')
  } finally {
    // Close the connection
    await dataSource.destroy()
  }
}

const seed = async (AppDataSource: DataSource) => {
  try {
    // log seed length
    Logger.log(`Running ${Object.keys(seeders).length} seeders...`, 'Seeder')

    // Run all seeders
    for (const seeder of Object.values(seeders)) {
      await seeder(AppDataSource)

      // Log the successful seeder
      Logger.log(`${seeder.name} executed successfully.`, 'Seeder')
    }

    // Log the successful seed
    Logger.log('Seeders executed successfully.', 'Seeder')
  } catch (error) {
    // console.log(error.stack)

    Logger.error('Error running seeders:', error?.stack, 'Seeder')
  }
}

// Execute the function
RunMigrations()
