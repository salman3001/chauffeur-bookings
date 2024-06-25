import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { GlobalHttpExceptionsFilter } from './Exceptions/GlobalHttpExceptionsFilter';
import cookieParser from 'cookie-parser';

export async function createTestApp() {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const testApp = moduleFixture.createNestApplication();
  testApp.useGlobalFilters(new GlobalHttpExceptionsFilter());
  testApp.use(cookieParser());

  await testApp.init();

  return { moduleFixture, testApp };
}
