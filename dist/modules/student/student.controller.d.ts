import { StudentService } from './student.service';
import { CreateStudentDto, UpdateStudentDto } from './student.dto';
export declare class StudentController {
    private readonly studentService;
    constructor(studentService: StudentService);
    findAll(): Promise<import("../../entities/Student").Student[]>;
    findOne(id: number): Promise<import("../../entities/Student").Student>;
    create(dto: CreateStudentDto, req: any): Promise<import("../../entities/Student").Student[]>;
    update(id: number, dto: UpdateStudentDto): Promise<import("../../entities/Student").Student>;
    deactivate(id: number): Promise<import("../../entities/Student").Student>;
    activate(id: number): Promise<import("../../entities/Student").Student>;
}
