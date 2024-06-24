import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { TestBed } from '@automock/jest';
import { CustomHttpException } from 'src/utils/Exceptions/CustomHttpException';
import { LoginDto } from 'src/auth/dto/login.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { UserType } from 'src/utils/enums/userType';
import { mockedDataSource } from 'src/utils/mocks/mockedDatasource';
import { AuthService } from './auth.service';
import { userFactory } from '../users/userFactory';
import { ConfigService } from '@nestjs/config';
import { resetPasswordDto } from './dto/resetPassword.dto';
import { forgotPasswordOtpDto } from './dto/forgotPasswordOtp.dto';

describe('AuthService', () => {
  let service: AuthService;
  let dataSource: jest.Mocked<DataSource>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(AuthService)
      .mock(ConfigService)
      .using({
        get: () => ({
          envs: () => ({ APP_SECRETE: 'salman' }),
        }),
      })
      .mock(getDataSourceToken('usersApp') as string)
      .using(mockedDataSource)
      .compile();
    service = unit;

    dataSource = unitRef.get(getDataSourceToken('usersApp') as string);
  });

  it('login', async () => {
    const loginDto: LoginDto = {
      email: 'salman@gmail.com',
      password: '123456789',
    };

    expect.assertions(2);
    try {
      const fakeUser = userFactory.build();
      (dataSource.manager.findOneBy as jest.Mock).mockResolvedValueOnce(
        fakeUser,
      );
      const user = await service.login(loginDto);
      expect(dataSource.manager.findOneBy).toHaveBeenCalled();
      expect(user).toEqual(fakeUser);
    } catch (error) {}
  });

  it('register', async () => {
    const registerDto: RegisterDto = {
      email: 'salman@gmail.com',
      password: '123456789',
      firstName: 'salman',
      lastName: 'khan',
      phone: '123',
    };

    expect.assertions(2);
    try {
      const fakeUser = userFactory.build();
      (dataSource.manager.save as jest.Mock).mockResolvedValueOnce(fakeUser);
      const user = await service.register(registerDto);
      expect(dataSource.manager.save).toHaveBeenCalled();
      expect(user).toEqual(registerDto);
    } catch (error) {}
  });

  it('forgot password', async () => {
    const registerDto: forgotPasswordOtpDto = {
      email: 'salman@gmail.com',
    };

    expect.assertions(3);
    try {
      const fakeUser = userFactory.build();
      (dataSource.manager.findOneByOrFail as jest.Mock).mockResolvedValueOnce(
        fakeUser,
      );
      const otp = await service.forgotPasswordOtp(registerDto);
      expect(dataSource.manager.save).toHaveBeenCalled();
      expect(otp).toBeGreaterThan(1);
      expect(otp).toBeInstanceOf(Number);
    } catch (error) {}
  });

  it('invalid otp', async () => {
    const dto: resetPasswordDto = {
      email: 'salman@gmail.com',
      password: '123456789',
      jwt: 'kjkasjka kajska skj',
    };

    expect.assertions(1);
    try {
      const fakeUser = userFactory.build();
      (dataSource.manager.findOneByOrFail as jest.Mock).mockResolvedValueOnce({
        ...fakeUser,
        otp: 987654,
      } as any);
      await service.resetPassword(dto);
    } catch (error) {
      expect(error).toBeInstanceOf(CustomHttpException);
    }
  });

  it('reset password', async () => {
    const dto: resetPasswordDto = {
      email: 'salman@gmail.com',
      password: '123456789',
      jwt: 'ashajh sjahsj a',
    };

    expect.assertions(2);
    try {
      const fakeUser = userFactory.build();
      (dataSource.manager.findOneByOrFail as jest.Mock).mockResolvedValueOnce({
        ...fakeUser,
        otp: 987654,
      } as any);
      const user = await service.resetPassword(dto);
      expect(dataSource.manager.save).toHaveBeenCalled();
      expect(user).toBeDefined();
    } catch (error) {}
  });

  it('generate a jwt token', async () => {
    jest.spyOn(jwt, 'sign').mockImplementationOnce(jest.fn(() => 'password'));
    const token = service.getToken({
      id: 1,
      userType: UserType.CUSTOMER,
    });
    expect(jwt.sign).toHaveBeenCalled();
    expect(token).toBe('password');
  });

  it('it varifies token', async () => {
    jest.spyOn(jwt, 'verify').mockImplementationOnce(jest.fn(() => true));
    const result = service.varifyToken('any token');
    expect(jwt.verify).toHaveBeenCalled();
    expect(result).toBeTruthy();
  });
});
