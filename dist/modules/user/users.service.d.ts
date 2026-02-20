import { User } from '@/entities/User';
import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { ChangePasswordDto, CreateUserDto, UpdateUserDto, UserStatusDto } from './user.dto';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    create(userData: CreateUserDto, _authUser: User): Promise<User>;
    listWithPagination(query: PaginateQuery, authUser: User): Promise<Paginated<User>>;
    findById(id: number): Promise<User | undefined>;
    findByIdForRef(id: number): Promise<User | undefined>;
    update(userData: UpdateUserDto, _authUser?: User): Promise<User>;
    remove(ids: number | number[], authUser: User): Promise<void>;
    hardDelete(ids: number | number[], authUser: User): Promise<void>;
    restore(ids: number | number[], authUser: User): Promise<void>;
    listTrashedWithPagination(query: PaginateQuery, authUser: User): Promise<Paginated<User>>;
    enableUser(data: UserStatusDto): Promise<User[]>;
    assignRoleToUser(userId: number, roleIds: number[]): Promise<User>;
    changePassword(changePasswordDto: ChangePasswordDto): Promise<boolean>;
    updateProfile(userData: Partial<UpdateUserDto>, _authUser: User): Promise<User>;
    getPermissionsOfUser(userId: number): Promise<any>;
    getUserHierarchy(parentId: number | null, nameFilter?: string | null): Promise<User[]>;
}
