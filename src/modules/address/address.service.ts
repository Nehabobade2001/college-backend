import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Address } from '@/entities/Address'
import { CreateAddressDto, UpdateAddressDto } from './address.dto'

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly repository: Repository<Address>,
  ) {}

  async create(createDto: CreateAddressDto): Promise<Address> {
    const entity = this.repository.create(createDto)
    return await this.repository.save(entity)
  }

  async findAll(): Promise<Address[]> {
    return await this.repository.find({
      where: { deletedAt: null },
      order: { createdAt: 'DESC' },
    })
  }

  async findOne(id: number): Promise<Address> {
    const entity = await this.repository.findOne({
      where: { id, deletedAt: null },
    })

    if (!entity) {
      throw new NotFoundException(`Address with ID ${id} not found`)
    }

    return entity
  }

  async update(id: number, updateDto: UpdateAddressDto): Promise<Address> {
    const entity = await this.findOne(id)
    Object.assign(entity, updateDto)
    return await this.repository.save(entity)
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id)
    await this.repository.softDelete(id)
  }
}
