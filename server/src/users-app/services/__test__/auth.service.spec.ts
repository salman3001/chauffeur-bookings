import { AuthService } from '../auth.service';
import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@salman3001/nest-config-module';
import { TestBed } from '@automock/jest';
import { CustomHttpException } from 'src/core/utils/Exceptions/CustomHttpException';
import { LoginDto } from 'src/users-app/dto/login.dto';
import { userFactory } from 'src/users-app/db/factories/userFactory';
import { RegisterDto } from 'src/users-app/dto/register.dto';
import { forgotPasswordOtpDto } from 'src/users-app/dto/resetPassword.dto';
import { resetPasswordDto } from 'src/users-app/dto/forgotPasswordOtp.dto';
import { UserType } from 'src/core/utils/enums/userType';
import { mockedDataSource } from 'src/core/utils/mocks/mockedDatasource';

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

  it('register vendor', async () => {
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
      const user = await service.registerVendor(registerDto);
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
      otp: 323232,
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
      otp: 987654,
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
      permissions: [],
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
