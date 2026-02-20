"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const users_service_1 = require("../../modules/user/users.service");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
exports.CurrentUser = (0, common_1.createParamDecorator)(async (_data, context) => {
    const isGraphQL = context.getType() === 'graphql';
    const gqlContext = isGraphQL
        ? graphql_1.GqlExecutionContext.create(context).getContext()
        : null;
    const request = gqlContext?.req ?? context.switchToHttp().getRequest();
    const decoded = gqlContext?.user ?? request?.user;
    if (!decoded) {
        console.warn('CurrentUser: decoded user is undefined');
        return null;
    }
    try {
        const moduleRef = request.moduleRef;
        if (!moduleRef)
            return decoded;
        const userService = moduleRef.get(users_service_1.UsersService, { strict: false });
        const user = userService
            ? await userService.findById(decoded.sub)
            : decoded;
        return user;
    }
    catch (err) {
        console.error('CurrentUser: Error retrieving user from ModuleRef', err);
        return decoded;
    }
});
//# sourceMappingURL=CurrentUser.js.map