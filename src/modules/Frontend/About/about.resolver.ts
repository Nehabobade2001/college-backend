import { About } from '@/entities/About'
import { Mutation, Query, Resolver } from '@nestjs/graphql'
import { AboutService } from './about.service'
import { CreateAboutDto, UpdateAboutDto } from './about.dto'

@Resolver(() => About)
export class AboutResolver {
  constructor(private readonly aboutService: AboutService) {}

  // All About entries
  @Query(() => [About])
  async getAllAbout(): Promise<About[]> {
    return this.aboutService.getAllAbout()
  }

  // Create a new About entry
  @Mutation(() => About)
  async createAbout(data: CreateAboutDto): Promise<About> {
    return this.aboutService.create(data)
  }

  // Get about by ID
  @Query(() => About)
  async getAboutById(id: number): Promise<About> {
    return this.aboutService.getAboutById(id)
  }

  // Update an existing About entry
  @Mutation(() => About)
  async updateAbout(data: UpdateAboutDto): Promise<About> {
    return this.aboutService.update(data)
  }

  // Delete an About entry
  @Mutation(() => Boolean)
  async deleteAbout(id: number): Promise<boolean> {
    await this.aboutService.deleteAbout(id)
    return true
  }
}
