import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Category } from '@/entities/Category'
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createDto: CreateCategoryDto): Promise<Category> {
    const exists = await this.categoryRepository.findOne({
      where: { code: createDto.code },
    })

    if (exists) {
      throw new ConflictException(`Category with code ${createDto.code} already exists`)
    }

    const category = this.categoryRepository.create(createDto)
    return await this.categoryRepository.save(category)
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find({
      where: { deletedAt: null },
      relations: ['departments'],
      order: { createdAt: 'DESC' },
    })
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id, deletedAt: null },
      relations: ['departments'],
    })

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`)
    }

    return category
  }

  async update(id: number, updateDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(id)

    if (updateDto.code && updateDto.code !== category.code) {
      const exists = await this.categoryRepository.findOne({
        where: { code: updateDto.code },
      })

      if (exists) {
        throw new ConflictException(`Category with code ${updateDto.code} already exists`)
      }
    }

    Object.assign(category, updateDto)
    return await this.categoryRepository.save(category)
  }

  async remove(id: number): Promise<void> {
    const category = await this.findOne(id)
    await this.categoryRepository.softDelete(id)
  }
}
