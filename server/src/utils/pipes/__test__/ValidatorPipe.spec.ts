import { CustomHttpException } from '../../Exceptions/CustomHttpException';
import { HttpStatus } from '@nestjs/common';
import ValidatorPipe from '../ValidatorPipe';
import { TestUser } from './TestUser';

describe('validator pipe', () => {
  const user = new TestUser();
  user.email = 'sallam';
  user.firstName = 'salman';
  user.lastName = 'khan';

  it('should throw validation error', async () => {
    const pipe = new ValidatorPipe();
    expect.assertions(2);
    try {
      await pipe.transform(user, {
        type: 'body',
        data: undefined,
        metatype: TestUser,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(CustomHttpException);
      expect((error as CustomHttpException).getStatus()).toBe(
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  });

  it('should validate input', async () => {
    const pipe = new ValidatorPipe();
    user.email = 'salman@gmail.com';
    expect.assertions(2);
    try {
      const val = await pipe.transform(user, {
        type: 'body',
        data: undefined,
        metatype: Object,
      });
      expect(val).toBeDefined();
      expect(val).toMatchObject(user);
    } catch (error) {}
  });
});
