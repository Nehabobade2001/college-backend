import { ListInputDTO } from '@/common/paginationDto/withPagination';
import { PaginatedProjects, Project } from '@/entities/Project';
import { ProjectService } from './project.service';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    allPaginatedProjects(listInputDTO: ListInputDTO): Promise<PaginatedProjects>;
    getProjectById(id: number): Promise<Project>;
}
