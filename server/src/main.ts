import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { GlobalHttpExceptionsFilter } from './utils/Exceptions/GlobalHttpExceptionsFilter';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './config/app.config';
import ValidatorPipe from './utils/pipes/ValidatorPipe';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser());
  app.useGlobalFilters(new GlobalHttpExceptionsFilter());
  app.useGlobalPipes(new ValidatorPipe());

  const config = app.get<ConfigService>(ConfigService);

  //cors
  app.enableCors({
    origin: [config.get<AppConfig>('appConfig')!.appUrl],
    credentials: true,
  });

  // swagger
  if (config.get<AppConfig>('appConfig')!.nodeEnv === 'dev') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle(config.get<AppConfig>('appConfig')!.appName)
      .setDescription('All server apis documented here')
      .setVersion('1.0')
      .addTag(config.get<AppConfig>('appConfig')!.appName)
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('documentation', app, document);
  }

  app.setGlobalPrefix('api');

  await app.listen(config.get<AppConfig>('appConfig')!.port);
}
bootstrap();
