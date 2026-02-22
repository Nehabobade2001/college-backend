import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Subject } from '@/entities/Subject'
import { CreateSubjectDto, UpdateSubjectDto } from './subject.dto'

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private readonly repository: Repository<Subject>,
  ) {}

  async create(createDto: CreateSubjectDto): Promise<Subject> {
    const exists = await this.repository.findOne({
      where: { code: createDto.code },
    })

    if (exists) {
      throw new ConflictException(`Subject with code ${createDto.code} already exists`)
    }

    const entity = this.repository.create(createDto)
    return await this.repository.save(entity)
  }

  async findAll(): Promise<Subject[]> {
    return await this.repository.find({
      where: { deletedAt: null },
      order: { createdAt: 'DESC' },
    })
  }

  async findOne(id: number): Promise<Subject> {
    const entity = await this.repository.findOne({
      where: { id, deletedAt: null },
    })

    if (!entity) {
      throw new NotFoundException(`Subject with ID ${id} not found`)
    }

    return entity
  }

  async update(id: number, updateDto: UpdateSubjectDto): Promise<Subject> {
    const entity = await this.findOne(id)

    if (updateDto.code && updateDto.code !== entity.code) {
      const exists = await this.repository.findOne({
        where: { code: updateDto.code },
      })

      if (exists) {
        throw new ConflictException(`Subject with code ${updateDto.code} already exists`)
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
