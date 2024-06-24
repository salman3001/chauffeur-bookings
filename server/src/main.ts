import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { GlobalHttpExceptionsFilter } from './utils/Exceptions/GlobalHttpExceptionsFilter';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalFilters(new GlobalHttpExceptionsFilter());

  const config = app.get<ConfigService>(ConfigService);

  if (config.get<AppConfig>('appConfig')!.nodeEnv === 'dev') {
    // swagger
    const swaggerConfig = new DocumentBuilder()
      .setTitle(config.get<AppConfig>('appConfig')!.appName)
      .setDescription('All server apis documented here')
      .setVersion('1.0')
      .addTag(config.get<AppConfig>('appConfig')!.appName)
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('documentation', app, document);
  }

  await app.listen(3000);
}
bootstrap();
