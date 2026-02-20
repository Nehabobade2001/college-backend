import { ListInputDTO } from '@/common/paginationDto/withPagination';
import { PaginatedUsers, User, UserArray } from '@/entities/User';
import { ChangePasswordDto, CreateUserDto, UpdateUserDto, UserStatusDto } from './user.dto';
import { UsersService } from './users.service';
export declare class UsersResolver {
    private usersService;
    constructor(usersService: UsersService);
    resolveReference(reference: {
        __typename: string;
        id: number;
    }): Promise<User>;
    paginatedUsers(listInputDTO: ListInputDTO, authUser: User): Promise<PaginatedUsers>;
    createUser(data: CreateUserDto, authUser: User): Promise<User>;
    findUserById(id: number): Promise<User>;
    updateUser(data: UpdateUserDto, authUser: User): Promise<User>;
    deleteUser(ids: number[], authUser: User): Promise<boolean>;
    assignRoleToUser(userId: number, roleIds: number[]): Promise<User>;
    changePassword(changePasswordData: ChangePasswordDto): Promise<boolean>;
    updateProfile(data: UpdateUserDto, authUser: User): Promise<User>;
    findPermissionsByUser(id: number): Promise<string[]>;
    restoreUser(ids: number[], authUser: User): Promise<boolean>;
    hardDeleteUser(ids: number[], authUser: User): Promise<boolean>;
    trashedUsers(listInputDTO: ListInputDTO, authUser: User): Promise<PaginatedUsers>;
    changeUserStatus(data: UserStatusDto): Promise<User | UserArray>;
    userHierarchy(parentId: number | null, nameFilter?: string | null): Promise<User[]>;
}
