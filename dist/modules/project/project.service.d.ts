import { Project } from '@/entities/Project';
import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { CreateProjectDto, ProjectStatusDto, UpdateProjectDto } from './project.dto';
import { User } from '@/entities/User';
export declare class ProjectService {
    private projectRepository;
    constructor(projectRepository: Repository<Project>);
    create(projectData: CreateProjectDto, currentUser: User): Promise<Project>;
    listWithPagination(query: PaginateQuery): Promise<Paginated<Project>>;
    findById(id: number): Promise<Project>;
    update(projectData: UpdateProjectDto, currentUser: User): Promise<Project>;
    delete(ids: number | number[]): Promise<boolean>;
    hardDelete(ids: number | number[]): Promise<void>;
    restore(ids: number | number[]): Promise<void>;
    listTrashedWithPagination(query: PaginateQuery): Promise<Paginated<Project>>;
    enableProject(data: ProjectStatusDto): Promise<Project[]>;
}
