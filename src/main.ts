import { NestFactory, repl } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, Logger as LoggerBuild } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import * as requestIp from 'request-ip';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { isProduction, isTest, logoShow } from './common/utils';
import config from './config';
import { HttpExceptionFilter } from './core/filter/http-exception/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform/transform.interceptor';
import { join } from 'path';

const loggerInit = new LoggerBuild('InitProject');

async function bootstrap() {
  // CORS is enabled
  await logoShow();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    bufferLogs: true,
  });

  const logger = app.get(Logger);
  app.useLogger(logger);

  // Request Validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.useStaticAssets(join(__dirname, 'static'), {
    prefix: '/uploads',
  });

  app.use(requestIp.mw());
  const prefix = process.env.API_PREFIX || '/v1';
  app.setGlobalPrefix(prefix);
  app.enableCors();

  // Helmet Middleware against known security vulnerabilities
  app.use(helmet());
  if (isTest()) {
    await repl(AppModule);
  }
  //Swagger API Documentation
  if (!isProduction()) {
    {
      const options = new DocumentBuilder()
        .setBasePath(prefix)
        .setTitle(config.swagger.info.title)
        .setDescription(config.swagger.info.description)
        .setVersion(config.swagger.info.version)
        .addBearerAuth()
        .build();
      const document = SwaggerModule.createDocument(app, options);
      SwaggerModule.setup(process.env.APP_DOC_PATH || 'docs', app, document);
    }
  }

  await app.listen(~~(process.env.APP_PORT || 3000), '0.0.0.0');
  const url = await app.getUrl();

  loggerInit.log(`Now env of app : ${process.env.NODE_ENV}`);
  loggerInit.log(`Application is running on: ${url}${prefix}`);

  if (!isProduction()) {
    loggerInit.log(
      `Please visit swagger document at ${url}/${process.env.APP_DOC_PATH}`,
    );
    loggerInit.log(
      `Download swagger-json at ${url}/${process.env.APP_DOC_PATH}-json`,
    );
  }
}

bootstrap();
