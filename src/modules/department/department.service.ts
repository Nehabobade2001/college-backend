import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Department } from '@/entities/Department'
import { CreateDepartmentDto, UpdateDepartmentDto } from './department.dto'

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly repository: Repository<Department>,
  ) {}

  async create(createDto: CreateDepartmentDto): Promise<Department> {
    const exists = await this.repository.findOne({
      where: { code: createDto.code },
    })

    if (exists) {
      throw new ConflictException(`Department with code ${createDto.code} already exists`)
    }

    const entity = this.repository.create(createDto)
    return await this.repository.save(entity)
  }

  async findAll(): Promise<Department[]> {
    return await this.repository.find({
      where: { deletedAt: null },
      relations: ['category', 'programs'],
      order: { createdAt: 'DESC' },
    })
  }

  async findOne(id: number): Promise<Department> {
    const entity = await this.repository.findOne({
      where: { id, deletedAt: null },
      relations: ['category', 'programs'],
    })

    if (!entity) {
      throw new NotFoundException(`Department with ID ${id} not found`)
    }

    return entity
  }

  async update(id: number, updateDto: UpdateDepartmentDto): Promise<Department> {
    const entity = await this.findOne(id)

    if (updateDto.code && updateDto.code !== entity.code) {
      const exists = await this.repository.findOne({
        where: { code: updateDto.code },
      })

      if (exists) {
        throw new ConflictException(`Department with code ${updateDto.code} already exists`)
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
