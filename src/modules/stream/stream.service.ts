import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Stream } from '@/entities/Stream'
import { CreateStreamDto, UpdateStreamDto } from './stream.dto'

@Injectable()
export class StreamService {
  constructor(
    @InjectRepository(Stream)
    private readonly repository: Repository<Stream>,
  ) {}

  async create(createDto: CreateStreamDto): Promise<Stream> {
    const exists = await this.repository.findOne({
      where: { code: createDto.code },
    })

    if (exists) {
      throw new ConflictException(`Stream with code ${createDto.code} already exists`)
    }

    const entity = this.repository.create(createDto)
    return await this.repository.save(entity)
  }

  async findAll(): Promise<Stream[]> {
    return await this.repository.find({
      where: { deletedAt: null },
      relations: ['program', 'specializations'],
      order: { createdAt: 'DESC' },
    })
  }

  async findOne(id: number): Promise<Stream> {
    const entity = await this.repository.findOne({
      where: { id, deletedAt: null },
      relations: ['program', 'specializations'],
    })

    if (!entity) {
      throw new NotFoundException(`Stream with ID ${id} not found`)
    }

    return entity
  }

  async update(id: number, updateDto: UpdateStreamDto): Promise<Stream> {
    const entity = await this.findOne(id)

    if (updateDto.code && updateDto.code !== entity.code) {
      const exists = await this.repository.findOne({
        where: { code: updateDto.code },
      })

      if (exists) {
        throw new ConflictException(`Stream with code ${updateDto.code} already exists`)
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
