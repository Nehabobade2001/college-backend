import { ListInputDTO } from '@/common/paginationDto/withPagination';
import { PaginatedProjects, Project, ProjectArray } from '@/entities/Project';
import { CreateProjectDto, ProjectStatusDto, UpdateProjectDto } from './project.dto';
import { ProjectService } from './project.service';
import { User } from '@/entities/User';
export declare class ProjectResolver {
    private projectService;
    constructor(projectService: ProjectService);
    resolveReference(reference: {
        __typename: string;
        id: number;
    }): Promise<Project>;
    createProject(createProjectInput: CreateProjectDto, currentUser: User): Promise<Project>;
    paginatedProjects(listInputDTO: ListInputDTO): Promise<PaginatedProjects>;
    project(id: number): Promise<Project>;
    updateProject(updateProjectInput: UpdateProjectDto, currentUser: User): Promise<Project>;
    deleteProject(ids: number[]): Promise<boolean>;
    enableProjectStatus(data: ProjectStatusDto): Promise<Project | ProjectArray>;
    hardDeleteProject(ids: number[]): Promise<boolean>;
    restoreProject(ids: number[]): Promise<boolean>;
    listTrashedProjects(listInputDTO: ListInputDTO): Promise<PaginatedProjects>;
}
