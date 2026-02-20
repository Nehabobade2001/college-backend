"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./modules/app/app.module");
require("./config/EnvConfig");
const common_1 = require("@nestjs/common");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const AttachModuleRefInterceptor_1 = require("./common/middleware/AttachModuleRefInterceptor");
const path_1 = require("path");
const static_1 = __importDefault(require("@fastify/static"));
const multipart_1 = __importDefault(require("@fastify/multipart"));
async function bootstrap() {
    common_1.Logger.log(`MicroService: Master Management`, 'Bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    app.useGlobalInterceptors(new AttachModuleRefInterceptor_1.AttachModuleRefInterceptor(app.get(core_1.ModuleRef)));
    const fastify = app
        .getHttpAdapter()
        .getInstance();
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        exceptionFactory: (errors) => {
            const formattedErrors = errors.reduce((acc, err) => {
                const constraints = Object.values(err.constraints);
                acc[err.property] = constraints.join(', ');
                return acc;
            }, {});
            return new Error(JSON.stringify(formattedErrors));
        },
    }));
    await fastify.register(static_1.default, {
        root: (0, path_1.join)(__dirname, '..', 'public'),
        prefix: '/public/',
    });
    await fastify.register(multipart_1.default, {
        limits: { fileSize: 20 * 1024 * 1024 },
    });
    app.enableCors();
    app.setGlobalPrefix('api');
    await app.listen(process.env.SERVER_PORT || 3001, process.env.SERVER_IP || '0.0.0.0');
    common_1.Logger.log(`Server running on ${process.env.SERVER_IP || '0.0.0.0'}:${process.env.SERVER_PORT || 3001}
    `, 'Bootstrap');
}
bootstrap();
//# sourceMappingURL=main.js.map