import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';
import { Config } from 'src/core/config/config';
import { ConfigService } from '@salman3001/nest-config-module';
import { MigrateToVendorDto } from '../dto/migrateToVendorDto';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { forgotPasswordOtpDto } from '../dto/resetPassword.dto';
import { resetPasswordDto } from '../dto/forgotPasswordOtp.dto';
import ValidatorPipe from 'src/core/utils/pipes/ValidatorPipe';
import CustomRes from 'src/core/utils/CustomRes';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private config: ConfigService,
  ) {}

  @Post('login')
  async login(
    @Body(new ValidatorPipe()) dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.login(dto);

    const token = this.authService.getToken({
      id: user.id,
      userType: user.userType,
      permissions: user?.role?.permissions,
    });

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure:
        this.config.get<Config>().envs().NODE_ENV !== 'prod' ? false : true,
    });

    res.cookie('user', user, {
      secure:
        this.config.get<Config>().envs().NODE_ENV !== 'prod' ? false : true,
    });

    return CustomRes({
      data: null,
      code: HttpStatus.OK,
      message: 'Logen Successfully',
      success: true,
    });
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('auth_token');
    res.clearCookie('user');

    return CustomRes({
      data: null,
      code: HttpStatus.OK,
      message: 'Logout Successfully',
      success: true,
    });
  }

  @Post('register')
  async register(
    @Body(new ValidatorPipe()) dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.register(dto);
    const token = this.authService.getToken({
      id: user.id,
      userType: user.userType,
      permissions: undefined,
    });

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure:
        this.config.get<Config>().envs().NODE_ENV !== 'prod' ? false : true,
    });

    res.cookie('user', user, {
      secure:
        this.config.get<Config>().envs().NODE_ENV !== 'prod' ? false : true,
    });

    return CustomRes({
      code: HttpStatus.OK,
      message: 'Account created',
      data: null,
      success: true,
    });
  }

  @Post('register-vendor')
  async registerVendor(
    @Body(new ValidatorPipe()) dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.registerVendor(dto);
    const token = this.authService.getToken({
      id: user.id,
      userType: user.userType,
      permissions: undefined,
    });

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure:
        this.config.get<Config>().envs().NODE_ENV !== 'prod' ? false : true,
    });

    res.cookie('user', user, {
      secure:
        this.config.get<Config>().envs().NODE_ENV !== 'prod' ? false : true,
    });

    return CustomRes({
      code: HttpStatus.OK,
      message: 'Account created',
      data: null,
      success: true,
    });
  }

  @Post('migrate-to-vendor')
  async migrateToVendor(
    @Body(new ValidatorPipe()) dto: MigrateToVendorDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.migrateToVendor(dto);
    const token = this.authService.getToken({
      id: user.id,
      userType: user.userType,
      permissions: undefined,
    });

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure:
        this.config.get<Config>().envs().NODE_ENV !== 'prod' ? false : true,
    });

    res.cookie('user', user, {
      secure:
        this.config.get<Config>().envs().NODE_ENV !== 'prod' ? false : true,
    });

    return CustomRes({
      code: HttpStatus.OK,
      message: 'Account migrated',
      data: null,
      success: true,
    });
  }

  @Post('forgot-password-otp')
  async forgotPasswordOtp(
    @Body(new ValidatorPipe()) dto: forgotPasswordOtpDto,
  ) {
    const otp = await this.authService.forgotPasswordOtp(dto);

    return CustomRes({
      code: HttpStatus.OK,
      message: 'OTP Sent',
      data: otp,
      success: true,
    });
  }

  @Post('reset-password')
  async resetPassword(@Body(new ValidatorPipe()) dto: resetPasswordDto) {
    const user = await this.authService.resetPassword(dto);

    return CustomRes({
      code: HttpStatus.OK,
      message: 'Password reset successfully',
      data: user,
      success: true,
    });
  }
}
