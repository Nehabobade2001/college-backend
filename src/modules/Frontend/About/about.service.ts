import { About } from '@/entities/About'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateAboutDto, UpdateAboutDto } from './about.dto'

@Injectable()
export class AboutService {
  constructor(
    @InjectRepository(About)
    private readonly aboutRepository: Repository<About>,
  ) {}

  // Get all About entries
  async getAllAbout(): Promise<About[]> {
    return this.aboutRepository.find()
  }

  // Create a new About entry
  async create(data: CreateAboutDto): Promise<About> {
    const newAbout = this.aboutRepository.create(data)
    return this.aboutRepository.save(newAbout)
  }

  // Get about by ID
  async getAboutById(id: number): Promise<About> {
    return this.aboutRepository.findOne({ where: { id } })
  }

  // Update an existing About entry
  async update(data: UpdateAboutDto): Promise<About> {
    await this.aboutRepository.update(data.id, data)
    return this.getAboutById(data.id)
  }

  // Delete an About entry
  async deleteAbout(id: number): Promise<void> {
    await this.aboutRepository.delete(id)
  }
}
