import { ModuleRef, NestFactory } from '@nestjs/core'
import { AppModule } from '@/modules/app/app.module'
import './config/EnvConfig'
import { Logger, ValidationPipe } from '@nestjs/common'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { AttachModuleRefInterceptor } from './common/middleware/AttachModuleRefInterceptor'
import { FastifyInstance } from 'fastify'
import { join } from 'path'
import fastifyStatic from '@fastify/static'
import multipart from '@fastify/multipart'

async function bootstrap() {
  Logger.log(`MicroService: Master Management`, 'Bootstrap')
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )
  app.useGlobalInterceptors(new AttachModuleRefInterceptor(app.get(ModuleRef)))

  // Get the Fastify instance from the Nest app
  const fastify = app
    .getHttpAdapter()
    .getInstance() as unknown as FastifyInstance

  // Enable global validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (errors) => {
        const formattedErrors = errors.reduce((acc, err) => {
          const constraints = Object.values(err.constraints)
          acc[err.property] = constraints.join(', ')
          return acc
        }, {})

        return new Error(JSON.stringify(formattedErrors))
      },
    }),
  )

  // Set Static Directory
  await fastify.register(fastifyStatic, {
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
  })

  await fastify.register(multipart, {
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
  })

  app.enableCors()

  // Set Trust Proxy
  app.setGlobalPrefix('api')

  await app.listen(
    process.env.SERVER_PORT || 3001,
    process.env.SERVER_IP || '0.0.0.0',
  )
  Logger.log(
    `Server running on ${process.env.SERVER_IP || '0.0.0.0'}:${process.env.SERVER_PORT || 3001}
    `,
    'Bootstrap',
  )
}
bootstrap()
