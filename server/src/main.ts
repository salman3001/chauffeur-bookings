import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { GlobalHttpExceptionsFilter } from './core/utils/Exceptions/GlobalHttpExceptionsFilter';
import { ConfigService } from '@salman3001/nest-config-module';
import { Config } from './core/config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalFilters(new GlobalHttpExceptionsFilter());

  const config = app.get<ConfigService>(ConfigService);

  if (config.get<Config>().envs().NODE_ENV === 'dev') {
    // swagger
    const swaggerConfig = new DocumentBuilder()
      .setTitle(config.get<Config>().envs().APP_NAME)
      .setDescription('All server apis documented here')
      .setVersion('1.0')
      .addTag(config.get<Config>().envs().APP_NAME)
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('documentation', app, document);
  }

  await app.listen(3000);
}
bootstrap();
