import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { GlobalHttpExceptionsFilter } from './Exceptions/GlobalHttpExceptionsFilter';
import * as cookieParser from 'cookie-parser';
import { CoreModule } from '../core.module';

export async function createTestApp() {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule, CoreModule],
  }).compile();

  const testApp = moduleFixture.createNestApplication();
  testApp.useGlobalFilters(new GlobalHttpExceptionsFilter());
  testApp.use(cookieParser());

  await testApp.init();

  return { moduleFixture, testApp };
}
