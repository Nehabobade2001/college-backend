import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Specialization } from '@/entities/Specialization'
import { CreateSpecializationDto, UpdateSpecializationDto } from './specialization.dto'

@Injectable()
export class SpecializationService {
  constructor(
    @InjectRepository(Specialization)
    private readonly repository: Repository<Specialization>,
  ) {}

  async create(createDto: CreateSpecializationDto): Promise<Specialization> {
    const exists = await this.repository.findOne({
      where: { code: createDto.code },
    })

    if (exists) {
      throw new ConflictException(`Specialization with code ${createDto.code} already exists`)
    }

    const entity = this.repository.create(createDto)
    return await this.repository.save(entity)
  }

  async findAll(): Promise<Specialization[]> {
    return await this.repository.find({
      where: { deletedAt: null },
      relations: ['stream'],
      order: { createdAt: 'DESC' },
    })
  }

  async findOne(id: number): Promise<Specialization> {
    const entity = await this.repository.findOne({
      where: { id, deletedAt: null },
      relations: ['stream'],
    })

    if (!entity) {
      throw new NotFoundException(`Specialization with ID ${id} not found`)
    }

    return entity
  }

  async update(id: number, updateDto: UpdateSpecializationDto): Promise<Specialization> {
    const entity = await this.findOne(id)

    if (updateDto.code && updateDto.code !== entity.code) {
      const exists = await this.repository.findOne({
        where: { code: updateDto.code },
      })

      if (exists) {
        throw new ConflictException(`Specialization with code ${updateDto.code} already exists`)
      }
    }

    Object.assign(entity, updateDto)
    return await this.repository.save(entity)
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id)
    await this.repository.softDelete(id)
  }
}
