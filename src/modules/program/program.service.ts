import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Program } from '@/entities/Program'
import { CreateProgramDto, UpdateProgramDto } from './program.dto'

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(Program)
    private readonly repository: Repository<Program>,
  ) {}

  async create(createDto: CreateProgramDto): Promise<Program> {
    const exists = await this.repository.findOne({
      where: { code: createDto.code },
    })

    if (exists) {
      throw new ConflictException(`Program with code ${createDto.code} already exists`)
    }

    const entity = this.repository.create(createDto)
    return await this.repository.save(entity)
  }

  async findAll(): Promise<Program[]> {
    return await this.repository.find({
      where: { deletedAt: null },
      relations: ['department', 'streams'],
      order: { createdAt: 'DESC' },
    })
  }

  async findOne(id: number): Promise<Program> {
    const entity = await this.repository.findOne({
      where: { id, deletedAt: null },
      relations: ['department', 'streams'],
    })

    if (!entity) {
      throw new NotFoundException(`Program with ID ${id} not found`)
    }

    return entity
  }

  async update(id: number, updateDto: UpdateProgramDto): Promise<Program> {
    const entity = await this.findOne(id)

    if (updateDto.code && updateDto.code !== entity.code) {
      const exists = await this.repository.findOne({
        where: { code: updateDto.code },
      })

      if (exists) {
        throw new ConflictException(`Program with code ${updateDto.code} already exists`)
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
