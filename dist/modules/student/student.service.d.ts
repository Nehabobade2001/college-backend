import { Repository } from 'typeorm';
import { Student } from '@/entities/Student';
import { CreateStudentDto, UpdateStudentDto } from './student.dto';
import { MailService } from '@/modules/global/mail.service';
export declare class StudentService {
    private readonly studentRepo;
    private readonly mailService;
    private readonly logger;
    constructor(studentRepo: Repository<Student>, mailService: MailService);
    findAll(): Promise<Student[]>;
    findOne(id: number): Promise<Student>;
    create(dto: CreateStudentDto, authUser?: any): Promise<Student[]>;
    update(id: number, dto: UpdateStudentDto): Promise<Student>;
    deactivate(id: number): Promise<Student>;
    activate(id: number): Promise<Student>;
}
