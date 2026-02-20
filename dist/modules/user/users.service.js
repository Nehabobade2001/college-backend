"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const ErrorCodes_1 = require("../../common/const/ErrorCodes");
const GraphQLErrorHandling_1 = require("../../common/helpers/GraphQLErrorHandling");
const helper_1 = require("../../common/helpers/helper");
const Role_1 = require("../../entities/Role");
const User_1 = require("../../entities/User");
const UserRole_1 = require("../../entities/UserRole");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const argon2 = __importStar(require("argon2"));
const nestjs_paginate_1 = require("nestjs-paginate");
const typeorm_2 = require("typeorm");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(userData, _authUser) {
        const queryRunner = this.userRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const hashedPassword = 'Password@123';
            const roles = await manager.find(Role_1.Role, {
                where: {
                    id: (0, typeorm_2.In)(userData.roleIds),
                    organizationId: _authUser.organizationId,
                },
            });
            if (!roles.length) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.NO_ROLES_FOUND);
            }
            const authUser = _authUser;
            console.log('authUser', authUser);
            let userType = authUser.userType;
            if (authUser.userType === User_1.UserType.admin ||
                authUser.userType === User_1.UserType.adminEmployee) {
                if (userData.userType === User_1.UserType.admin ||
                    userData.userType === User_1.UserType.adminEmployee) {
                    userType = userData.userType;
                }
                else {
                    (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.INVALID_USER_TYPE);
                }
            }
            else if (authUser.userType === User_1.UserType.organization ||
                authUser.userType === User_1.UserType.organizationEmployee) {
                if (userData.userType === User_1.UserType.organization ||
                    userData.userType === User_1.UserType.organizationEmployee) {
                    userType = userData.userType;
                }
                else {
                    (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.INVALID_USER_TYPE);
                }
            }
            else {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.INVALID_USER_TYPE);
            }
            const newUser = manager.create(User_1.User, {
                ...userData,
                userType,
                status: 'active',
                password: hashedPassword,
                organizationId: authUser.organizationId,
                roles,
                parent: await manager.findOne(User_1.User, {
                    where: { id: userData.parentId },
                }),
                designation: userData.designation,
            });
            const saved = await manager.save(newUser);
            await queryRunner.commitTransaction();
            return await this.userRepository.findOneOrFail({
                where: { id: saved.id },
            });
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async listWithPagination(query, authUser) {
        const limit = Math.min(query.limit ?? 50, 50);
        const orgId = authUser?.organizationId;
        if (!orgId) {
            (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.ORGANIZATION_NOT_FOUND);
        }
        const user = await (0, nestjs_paginate_1.paginate)(query, this.userRepository, {
            defaultLimit: limit,
            defaultSortBy: [['createdAt', 'DESC']],
            maxLimit: 50,
            relations: ['roles', 'organization'],
            where: {
                organizationId: orgId,
                ...(query.filter?.parentId && {
                    parentId: Number(query.filter.parentId),
                }),
            },
            sortableColumns: [
                'id',
                'name',
                'username',
                'email',
                'mobileNo',
                'status',
                'designation',
                'createdAt',
            ],
            filterableColumns: {
                name: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.ILIKE],
                username: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.ILIKE],
                email: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.ILIKE],
                status: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.IN],
                mobileNo: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.ILIKE],
                createdAt: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.GT, nestjs_paginate_1.FilterOperator.LT],
                parentId: [nestjs_paginate_1.FilterOperator.EQ],
            },
            searchableColumns: [
                'name',
                'username',
                'email',
                'mobileNo',
                'designation',
                'status',
            ],
        });
        return user;
    }
    async findById(id) {
        const queryRunner = this.userRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const manager = queryRunner.manager;
            const user = await manager.findOne(User_1.User, {
                where: { id: id ?? null },
                relations: [
                    'roles',
                    'roles.permissions',
                    'organization',
                    'project',
                    'subordinates',
                    'subordinates.subordinates',
                ],
            });
            if (!user) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.USER_NOT_FOUND, { email: user?.email });
            }
            await queryRunner.commitTransaction();
            return user;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async findByIdForRef(id) {
        const user = await this.userRepository.findOne({
            where: { id: id ?? null },
            withDeleted: true,
            relations: [
                'roles',
                'roles.permissions',
                'organization',
                'project',
                'subordinates',
                'subordinates.subordinates',
            ],
        });
        if (!user) {
            (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.USER_NOT_FOUND, { email: user?.email });
        }
        return user;
    }
    async update(userData, _authUser) {
        const queryRunner = this.userRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const manager = queryRunner.manager;
            const user = await manager.findOne(User_1.User, {
                where: { id: userData.id ?? null },
            });
            if (!user) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.USER_NOT_FOUND);
            }
            if (user.email !== userData.email) {
                const existingUser = await manager.findOne(User_1.User, {
                    where: { email: userData.email },
                });
                if (existingUser) {
                    (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.USER_CANNOT_CHANGE_EMAIL, {
                        email: userData.email,
                    });
                }
            }
            const roles = await manager.find(Role_1.Role, {
                where: {
                    id: (0, typeorm_2.In)(userData.roleIds),
                    organizationId: _authUser.organizationId,
                },
            });
            if (!roles.length) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.NO_ROLES_FOUND);
            }
            const authUser = _authUser;
            console.log('authUser', authUser);
            let userType = authUser.userType;
            if (authUser.userType === User_1.UserType.admin ||
                authUser.userType === User_1.UserType.adminEmployee) {
                if (userData.userType === User_1.UserType.admin ||
                    userData.userType === User_1.UserType.adminEmployee) {
                    userType = userData.userType;
                }
                else {
                    (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.INVALID_USER_TYPE);
                }
            }
            else if (authUser.userType === User_1.UserType.organization ||
                authUser.userType === User_1.UserType.organizationEmployee) {
                if (userData.userType === User_1.UserType.organization ||
                    userData.userType === User_1.UserType.organizationEmployee) {
                    userType = userData.userType;
                }
                else {
                    (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.INVALID_USER_TYPE);
                }
            }
            else {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.INVALID_USER_TYPE);
            }
            await manager.save(manager.merge(User_1.User, user, {
                ...userData,
                userType,
                organizationId: _authUser.organizationId,
                roles,
                parent: await manager.findOne(User_1.User, {
                    where: { id: userData.parentId },
                }),
                designation: userData.designation,
            }));
            await queryRunner.commitTransaction();
            return manager.findOne(User_1.User, { where: { id: userData.id } });
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async remove(ids, authUser) {
        const idArray = Array.isArray(ids) ? ids : [ids];
        const users = await this.userRepository.find({
            where: idArray.map((id) => ({ id, organizationId: authUser.id })),
            withDeleted: true,
        });
        if (users.length !== idArray.length) {
            (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.USER_NOT_FOUND, {
                email: users.map((user) => user.email).join(', '),
            });
        }
        if (users.some((user) => user.isPrimary)) {
            (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.CANNOT_DELETE_SUPER_ADMIN);
        }
        if (ids === authUser.id) {
            (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.CANNOT_DELETE_LOGGED_IN_USER);
        }
        await this.userRepository.softDelete(ids);
    }
    async hardDelete(ids, authUser) {
        const idArray = Array.isArray(ids) ? ids : [ids];
        const users = await this.userRepository.find({
            where: idArray.map((id) => ({ id, organizationId: authUser.id })),
            withDeleted: true,
        });
        if (users.length !== idArray.length) {
            (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.USER_NOT_FOUND, {
                email: users.map((user) => user.email).join(', '),
            });
        }
        if (users.some((user) => user.isPrimary)) {
            (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.CANNOT_DELETE_SUPER_ADMIN);
        }
        if (ids === authUser.id) {
            (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.CANNOT_DELETE_LOGGED_IN_USER);
        }
        await this.userRepository.delete(ids);
    }
    async restore(ids, authUser) {
        const idArray = Array.isArray(ids) ? ids : [ids];
        const users = await this.userRepository.find({
            where: idArray.map((id) => ({ id, organizationId: authUser.id })),
            withDeleted: true,
        });
        if (users.length !== idArray.length) {
            (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.USER_NOT_FOUND);
        }
        await this.userRepository.restore(ids);
    }
    async listTrashedWithPagination(query, authUser) {
        const limit = Math.min(query.limit ?? 50, 50);
        return (0, nestjs_paginate_1.paginate)(query, this.userRepository, {
            defaultLimit: limit,
            defaultSortBy: [['createdAt', 'DESC']],
            maxLimit: 50,
            relations: ['roles', 'organization'],
            sortableColumns: [
                'id',
                'name',
                'username',
                'email',
                'mobileNo',
                'status',
                'createdAt',
            ],
            filterableColumns: {
                name: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.ILIKE],
                username: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.ILIKE],
                email: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.ILIKE],
                status: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.IN],
                mobileNo: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.ILIKE],
                createdAt: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.GT, nestjs_paginate_1.FilterOperator.LT],
            },
            searchableColumns: ['name', 'username', 'email', 'mobileNo', 'status'],
            withDeleted: true,
            where: {
                deletedAt: (0, typeorm_2.Not)((0, typeorm_2.IsNull)()),
                organizationId: authUser.organizationId,
            },
        });
    }
    async enableUser(data) {
        const queryRunner = this.userRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const idArray = Array.isArray(data.ids) ? data.ids : [data.ids];
            const users = await manager.find(User_1.User, {
                where: idArray.map((id) => ({ id })),
            });
            console.log('users', users.some((user) => user.isPrimary));
            if (users.some((user) => user.isPrimary)) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.CANNOT_CHANGE_SUPER_ADMIN);
            }
            if (users.length !== idArray.length || users.some((p) => !p || !p.id)) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.USER_NOT_FOUND, {
                    email: users.map((user) => user.email).join(', '),
                });
            }
            const updatedUser = await manager.save(users.map((user) => manager.merge(User_1.User, user, {
                status: data.status,
            })));
            await queryRunner.commitTransaction();
            return updatedUser;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async assignRoleToUser(userId, roleIds) {
        const queryRunner = this.userRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const manager = queryRunner.manager;
            const user = await manager.findOne(User_1.User, {
                where: { id: userId ?? null },
            });
            if (!user) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.USER_NOT_FOUND);
            }
            const role = await manager.find(Role_1.Role, {
                where: {
                    id: (0, typeorm_2.In)(roleIds),
                },
            });
            if (!role) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.INVALID_ROLE);
            }
            await manager.save(manager.create(UserRole_1.UserRole, { userId, roleIds }));
            await queryRunner.commitTransaction();
            return user;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async changePassword(changePasswordDto) {
        const queryRunner = this.userRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const { currentPassword, newPassword, email } = changePasswordDto;
            const user = await manager.findOne(User_1.User, {
                where: { email: email ?? null },
            });
            if (!user) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.USER_NOT_FOUND);
            }
            const isCurrentPasswordValid = await argon2.verify(currentPassword, user.password);
            if (!isCurrentPasswordValid) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.INVALID_PASSWORD_INPUT, {
                    password: currentPassword,
                });
            }
            const hashedNewPassword = await argon2.hash(newPassword);
            user.password = hashedNewPassword;
            await this.userRepository.save(user);
            await queryRunner.commitTransaction();
            return true;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async updateProfile(userData, _authUser) {
        const queryRunner = this.userRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const manager = queryRunner.manager;
            const user = await manager.findOne(User_1.User, {
                where: { id: userData.id ?? null },
            });
            if (!user) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.USER_NOT_FOUND);
            }
            if (user.email !== userData.email) {
                const existingUser = await manager.findOne(User_1.User, {
                    where: { email: userData.email },
                });
                if (existingUser) {
                    (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.USER_CANNOT_CHANGE_EMAIL, {
                        email: userData.email,
                    });
                }
            }
            if ((0, helper_1.isTempFile)(userData.avatar)) {
                userData.avatar = await (0, helper_1.moveFile)(userData.avatar);
            }
            if (userData.avatar === '') {
                delete userData.avatar;
            }
            await manager.save(manager.merge(User_1.User, user, {
                ...userData,
                organizationId: _authUser.organizationId,
            }));
            await queryRunner.commitTransaction();
            return manager.findOne(User_1.User, { where: { id: userData.id ?? null } });
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async getPermissionsOfUser(userId) {
        const queryRunner = this.userRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const manager = queryRunner.manager;
            const user = await manager.findOne(User_1.User, {
                where: { id: userId ?? null },
                relations: ['roles', 'roles.permissions'],
            });
            if (!user) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.USER_NOT_FOUND);
            }
            await queryRunner.commitTransaction();
            const allPermissions = user.roles.reduce((acc, role) => {
                return [...acc, ...role.permissions.map((p) => p.slug)];
            }, []);
            const uniquePermissions = Array.from(new Set(allPermissions));
            return uniquePermissions.sort();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async getUserHierarchy(parentId, nameFilter) {
        const children = await this.userRepository.find({
            where: { parentId },
            relations: ['roles', 'organization', 'parent'],
        });
        const result = [];
        for (const child of children) {
            const descendants = await this.getUserHierarchy(child.id, nameFilter);
            const isSelfMatch = !nameFilter ||
                child.name.toLowerCase().includes(nameFilter.toLowerCase());
            const hasMatchingDescendants = descendants.length > 0;
            if (isSelfMatch || hasMatchingDescendants) {
                child.subordinates = descendants;
                result.push(child);
            }
        }
        return result;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map