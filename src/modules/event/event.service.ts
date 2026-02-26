import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Between, In, Repository } from 'typeorm'
import { Event, EventStatus } from '@/entities/Event'
import { CreateEventDto, FilterEventDto, UpdateEventDto } from './event.dto'
import { ListInputDTO } from '@/common/paginationDto/withPagination'

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async create(data: CreateEventDto, userId: number): Promise<Event> {
    const event = this.eventRepository.create({
      ...data,
      createdBy: userId,
    })
    return await this.eventRepository.save(event)
  }

  async findAll(filter?: FilterEventDto): Promise<Event[]> {
    const where: any = {}

    if (filter?.type) where.type = filter.type
    if (filter?.status) where.status = filter.status
    if (filter?.startDate && filter?.endDate) {
      where.startDate = Between(filter.startDate, filter.endDate)
    }

    return await this.eventRepository.find({
      where,
      relations: ['creator'],
      order: { createdAt: 'DESC' },
    })
  }

  async listWithPagination(
    listInputDTO: ListInputDTO,
    filter?: FilterEventDto,
  ) {
    const { page = 1, limit = 10, search } = listInputDTO
    const skip = (page - 1) * limit

    const queryBuilder = this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.creator', 'creator')

    if (search) {
      queryBuilder.where(
        'event.title LIKE :search OR event.description LIKE :search',
        { search: `%${search}%` },
      )
    }

    if (filter?.type) queryBuilder.andWhere('event.type = :type', { type: filter.type })
    if (filter?.status) queryBuilder.andWhere('event.status = :status', { status: filter.status })
    if (filter?.centerId) {
      queryBuilder.andWhere('event.centerIds LIKE :centerId', {
        centerId: `%${filter.centerId}%`,
      })
    }
    if (filter?.studentId) {
      queryBuilder.andWhere('event.studentIds LIKE :studentId', {
        studentId: `%${filter.studentId}%`,
      })
    }

    const [data, totalItems] = await queryBuilder
      .orderBy('event.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount()

    return {
      data,
      meta: {
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
        itemsPerPage: limit,
      },
    }
  }

  async findById(id: number): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['creator'],
    })
    if (!event) throw new NotFoundException(`Event with ID ${id} not found`)
    return event
  }

  async findByCenter(centerId: number): Promise<Event[]> {
    return await this.eventRepository
      .createQueryBuilder('event')
      .where('event.centerIds LIKE :centerId', { centerId: `%${centerId}%` })
      .andWhere('event.status = :status', { status: EventStatus.PUBLISHED })
      .orderBy('event.startDate', 'DESC')
      .getMany()
  }

  async findByStudent(studentId: number): Promise<Event[]> {
    return await this.eventRepository
      .createQueryBuilder('event')
      // eslint-disable-next-line prettier/prettier
      .where('event.studentIds LIKE :studentId', { studentId: `%${studentId}%` })
      .andWhere('event.status = :status', { status: EventStatus.PUBLISHED })
      .orderBy('event.startDate', 'DESC')
      .getMany()
  }

  async update(id: number, data: UpdateEventDto): Promise<Event> {
    const event = await this.findById(id)
    Object.assign(event, data)
    return await this.eventRepository.save(event)
  }

  async remove(id: number): Promise<void> {
    const event = await this.findById(id)
    await this.eventRepository.remove(event)
  }

  async publish(id: number): Promise<Event> {
    const event = await this.findById(id)
    event.status = EventStatus.PUBLISHED
    return await this.eventRepository.save(event)
  }

  async archive(id: number): Promise<Event> {
    const event = await this.findById(id)
    event.status = EventStatus.ARCHIVED
    return await this.eventRepository.save(event)
  }
}
