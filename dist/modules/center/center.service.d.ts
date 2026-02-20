import { Repository } from 'typeorm';
import { Center } from '../../entities/Center';
import { CreateCenterDto, UpdateCenterDto } from './center.dto';
import { MailService } from '@/modules/global/mail.service';
export declare class CenterService {
    private readonly centerRepo;
    private readonly mailService;
    private readonly logger;
    constructor(centerRepo: Repository<Center>, mailService: MailService);
    findAll(): Promise<Center[]>;
    findOne(id: number): Promise<Center>;
    create(dto: CreateCenterDto, authUser?: any): Promise<Center>;
    update(id: number, dto: UpdateCenterDto): Promise<Center>;
    deactivate(id: number): Promise<Center>;
    activate(id: number): Promise<Center>;
}
