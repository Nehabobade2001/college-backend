import AppDataSource from '@/config/DataSource'
import * as seeders from './index' // Import all seeders
import { Logger } from '@nestjs/common'

export const seed = async () => {
  try {
    // Initialize the data source (this connects to the database)
    await AppDataSource.initialize()

    // log the successful connection
    Logger.log('Database connected successfully...', 'Seeder')

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
  } catch (error: any) {
    // console.log(error.stack)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    Logger.error('Error running seeders:', error?.stack, 'Seeder')
  } finally {
    if (AppDataSource.isInitialized) {
      // Destroy the data source (this disconnects from the database)
      await AppDataSource.destroy()
    }
  }
}

// Execute the seed function
seed()
