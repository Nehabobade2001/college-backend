import { UsersService } from './users.service';
import { ListInputDTO } from '@/common/paginationDto/withPagination';
import { PaginatedUsers, User } from '@/entities/User';
import { ApiTokenService } from '../auth/apiToken.service';
import { CreateUserDto } from './user.dto';
export declare class UsersController {
    private readonly usersService;
    private readonly apiTokenService;
    constructor(usersService: UsersService, apiTokenService: ApiTokenService);
    getUserById(id: number): Promise<User>;
    getAllUsers(listInputDTO: ListInputDTO, authUser: User): Promise<PaginatedUsers>;
    userHierarchy(parentId: number | null, nameFilter?: string | null): Promise<User[]>;
    createUser(user: CreateUserDto, _authUser: User): Promise<User>;
    validateToken(tokenId: string, permissions: string[]): Promise<{
        error: boolean;
        message?: string;
        code?: string;
        user: User | null;
    }>;
}
