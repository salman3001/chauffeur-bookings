import { CustomHttpException } from 'src/core/utils/Exceptions/CustomHttpException';
import { AuthController } from '../auth.controller';
import { AuthService } from 'src/users-app/services/auth.service';
import { LoginDto } from 'src/users-app/dto/login.dto';
import { RegisterDto } from 'src/users-app/dto/register.dto';
import { userFactory } from 'src/users-app/db/factories/userFactory';
import { TestBed } from '@automock/jest';
import { ConfigService } from '@salman3001/nest-config-module';
import { HttpStatus } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let service: jest.Mocked<AuthService>;

  const loginDto: LoginDto = {
    email: 'salman@gmail.com',
    password: '123456789',
  };

  const registerDto: RegisterDto = {
    email: 'salman@gmail.com',
    password: '123456789',
    firstName: 'salman',
    lastName: 'khan',
    phone: '123',
  };

  const user = userFactory.build();

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(AuthController)
      .mock(ConfigService)
      .using({
        get: () => ({
          envs: () => ({ NODE_ENV: 'prod' }),
        }),
      })
      .compile();

    controller = unit;
    service = unitRef.get(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should fail login', async () => {
    expect.assertions(3);
    try {
      const res = { cookie: jest.fn(), clearCookie: jest.fn() } as any;
      service.login.mockRejectedValueOnce(
        new CustomHttpException({
          code: HttpStatus.UNAUTHORIZED,
          success: false,
        }),
      );
      await controller.login(loginDto, res as any);
    } catch (error) {
      expect(service.login).toHaveBeenCalled();
      expect(error).toBeInstanceOf(CustomHttpException);
      expect((error as CustomHttpException).getStatus()).toBe(
        HttpStatus.UNAUTHORIZED,
      );
    }
  });

  it('should login', async () => {
    const res = { cookie: jest.fn() } as any;
    expect.assertions(4);
    try {
      service.login.mockResolvedValueOnce(user);
      const result = await controller.login(loginDto, res);
      expect(service.login).toHaveBeenCalled();
      expect(service.getToken).toHaveBeenCalled();
      expect(res.cookie).toHaveBeenCalledTimes(2);
      expect(result).toMatchObject({ code: HttpStatus.OK });
    } catch (error) {}
  });

  it('should logout', () => {
    const res = { clearCookie: jest.fn() } as any;
    const result = controller.logout(res);
    expect(res.clearCookie).toHaveBeenCalledTimes(2);
    expect(result).toMatchObject({ code: HttpStatus.OK });
  });

  it('should register user', async () => {
    const res = { cookie: jest.fn() } as any;
    expect.assertions(4);
    try {
      service.register.mockResolvedValueOnce(user);
      service.getToken.mockReturnValueOnce('salman');
      const results = await controller.register(registerDto, res);

      expect(service.getToken).toHaveBeenCalled();
      expect(service.register).toHaveBeenCalled();
      expect(res.cookie).toHaveBeenCalledTimes(2);
      expect(results).toMatchObject({ code: HttpStatus.OK });
    } catch (error) {}
  });

  it('should register vendor', async () => {
    const res = { cookie: jest.fn() } as any;
    expect.assertions(4);
    try {
      service.registerVendor.mockResolvedValueOnce(user);
      service.getToken.mockReturnValueOnce('salman');
      const results = await controller.registerVendor(registerDto, res);

      expect(service.getToken).toHaveBeenCalled();
      expect(service.registerVendor).toHaveBeenCalled();
      expect(res.cookie).toHaveBeenCalledTimes(2);
      expect(results).toMatchObject({ code: HttpStatus.OK });
    } catch (error) {}
  });

  it('migrate to vendor', async () => {
    const res = { cookie: jest.fn() } as any;
    expect.assertions(4);
    try {
      service.migrateToVendor.mockResolvedValueOnce(user);
      service.getToken.mockReturnValueOnce('salman');
      const results = await controller.migrateToVendor(registerDto, res);

      expect(service.getToken).toHaveBeenCalled();
      expect(service.migrateToVendor).toHaveBeenCalled();
      expect(res.cookie).toHaveBeenCalledTimes(2);
      expect(results).toMatchObject({ code: HttpStatus.OK });
    } catch (error) {}
  });

  it('get forgot password otp', async () => {
    expect.assertions(3);
    try {
      service.forgotPasswordOtp.mockResolvedValueOnce(123456789);
      const results = await controller.forgotPasswordOtp({} as any);

      expect(results.data).toBe(123456789);
      expect(service.forgotPasswordOtp).toHaveBeenCalled();
      expect(results).toMatchObject({ code: HttpStatus.OK });
    } catch (error) {}
  });

  it('should reset password', async () => {
    expect.assertions(2);
    try {
      service.resetPassword.mockResolvedValueOnce({ name: 'salman' } as any);
      const results = await controller.resetPassword({} as any);

      expect(service.resetPassword).toHaveBeenCalled();
      expect(results).toMatchObject({ code: HttpStatus.OK });
    } catch (error) {}
  });
});
