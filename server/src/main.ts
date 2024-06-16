import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { GlobalHttpExceptionsFilter } from './core/utils/Exceptions/GlobalHttpExceptionsFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalFilters(new GlobalHttpExceptionsFilter());
  await app.listen(3000);
}
bootstrap();
