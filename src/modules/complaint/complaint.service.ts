import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Complaint, ComplaintStatus } from '@/entities/Complaint'
import { CreateComplaintDto, FilterComplaintDto, UpdateComplaintDto } from './complaint.dto'
import { ListInputDTO } from '@/common/paginationDto/withPagination'

@Injectable()
export class ComplaintService {
  constructor(
    @InjectRepository(Complaint)
    private readonly complaintRepository: Repository<Complaint>,
  ) {}

  async create(data: CreateComplaintDto): Promise<Complaint> {
    const complaint = this.complaintRepository.create(data)
    return await this.complaintRepository.save(complaint)
  }

  async findAll(filter?: FilterComplaintDto): Promise<Complaint[]> {
    const where: any = {}

    if (filter?.status) where.status = filter.status
    if (filter?.studentId) where.studentId = filter.studentId
    if (filter?.centerId) where.centerId = filter.centerId
    if (filter?.assignedTo) where.assignedTo = filter.assignedTo

    return await this.complaintRepository.find({
      where,
      relations: ['student', 'assignedUser'],
      order: { createdAt: 'DESC' },
    })
  }

  async listWithPagination(listInputDTO: ListInputDTO, filter?: FilterComplaintDto) {
    const { page = 1, limit = 10, search } = listInputDTO
    const skip = (page - 1) * limit

    const queryBuilder = this.complaintRepository
      .createQueryBuilder('complaint')
      .leftJoinAndSelect('complaint.student', 'student')
      .leftJoinAndSelect('complaint.assignedUser', 'assignedUser')

    if (search) {
      queryBuilder.where(
        'complaint.title LIKE :search OR complaint.description LIKE :search',
        { search: `%${search}%` },
      )
    }

    if (filter?.status) queryBuilder.andWhere('complaint.status = :status', { status: filter.status })
    if (filter?.studentId) queryBuilder.andWhere('complaint.studentId = :studentId', { studentId: filter.studentId })
    if (filter?.centerId) queryBuilder.andWhere('complaint.centerId = :centerId', { centerId: filter.centerId })
    if (filter?.assignedTo) queryBuilder.andWhere('complaint.assignedTo = :assignedTo', { assignedTo: filter.assignedTo })

    const [data, totalItems] = await queryBuilder
      .orderBy('complaint.createdAt', 'DESC')
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

  async findById(id: number): Promise<Complaint> {
    const complaint = await this.complaintRepository.findOne({
      where: { id },
      relations: ['student', 'assignedUser'],
    })
    if (!complaint) throw new NotFoundException(`Complaint with ID ${id} not found`)
    return complaint
  }

  async update(id: number, data: UpdateComplaintDto): Promise<Complaint> {
    const complaint = await this.findById(id)
    Object.assign(complaint, data)
    return await this.complaintRepository.save(complaint)
  }

  async assignToCenter(id: number, centerId: number, assignedTo?: number): Promise<Complaint> {
    const complaint = await this.findById(id)
    complaint.centerId = centerId
    if (assignedTo) complaint.assignedTo = assignedTo
    complaint.status = ComplaintStatus.IN_PROGRESS
    return await this.complaintRepository.save(complaint)
  }

  async resolve(id: number, resolution: string): Promise<Complaint> {
    const complaint = await this.findById(id)
    complaint.status = ComplaintStatus.RESOLVED
    complaint.resolution = resolution
    complaint.resolvedAt = new Date()
    return await this.complaintRepository.save(complaint)
  }

  async close(id: number): Promise<Complaint> {
    const complaint = await this.findById(id)
    complaint.status = ComplaintStatus.CLOSED
    return await this.complaintRepository.save(complaint)
  }

  async remove(id: number): Promise<void> {
    const complaint = await this.findById(id)
    await this.complaintRepository.remove(complaint)
  }
}
