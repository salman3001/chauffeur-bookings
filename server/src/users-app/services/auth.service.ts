import { HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { Config } from 'src/core/config/config';
import { resetPasswordDto } from '../dto/forgotPasswordOtp.dto';
import { UserType } from 'src/core/utils/enums/userType';
import { RegisterDto } from '../dto/register.dto';
import { forgotPasswordOtpDto } from '../dto/resetPassword.dto';
import { ConfigService } from '@salman3001/nest-config-module';
import { CustomHttpException } from 'src/core/utils/Exceptions/CustomHttpException';
import { generateOtp } from 'src/core/utils/helpers';
import { IJwtPayload } from 'src/core/utils/types/common';

import User from '../entities/user.entity';
import { DataSource } from 'typeorm';
import { compareSync } from 'bcrypt';
import { MailService } from '@salman3001/nest-mailer';
import { ForgorPasswordOtpEmail } from '../mails/forgorPasswordOtp.email';

@Injectable()
export class AuthService {
  constructor(
    @InjectDataSource('usersApp') private readonly dataSource: DataSource,
    private config: ConfigService,
    private readonly mailService: MailService,
  ) {}

  async login(dto: LoginDto): Promise<User> {
    const user = await this.dataSource.manager.findOneBy(User, {
      email: dto.email,
    });

    if (!user) {
      throw new CustomHttpException({
        code: HttpStatus.UNAUTHORIZED,
        success: false,
        message: 'Login Failed',
      });
    }

    const isPasswordValid = compareSync(dto.password, user.password);
    if (!isPasswordValid) {
      throw new CustomHttpException({
        code: HttpStatus.UNAUTHORIZED,
        success: false,
        message: 'Invalid Credentials',
      });
    }
    return user;
  }

  async register(dto: RegisterDto): Promise<User> {
    const userExist = await this.dataSource.manager.findOneBy(User, {
      email: dto.email,
    });
    if (userExist) {
      throw new CustomHttpException({
        code: HttpStatus.UNPROCESSABLE_ENTITY,
        success: false,
        message: 'Email id already exist',
      });
    }
    const user = Object.assign(new User(), {
      ...dto,
      userType: UserType.CUSTOMER,
    });

    await this.dataSource.manager.save(User, user);
    return user;
  }

  async forgotPasswordOtp(dto: forgotPasswordOtpDto) {
    const user = await this.dataSource.manager.findOneByOrFail(User, {
      email: dto.email,
    });

    const otp = generateOtp();
    user.otp = otp;
    await this.dataSource.manager.save(user);
    await this.mailService.queue([
      new ForgorPasswordOtpEmail(user.email, {
        name: `${user.firstName}`,
        otp,
      }),
    ]);
  }

  async resetPassword(dto: resetPasswordDto): Promise<User> {
    const user = await this.dataSource.manager.findOneByOrFail(User, {
      email: dto.email,
    });

    if (user.otp === dto.otp) {
      user.password = dto.password;
      await this.dataSource.manager.save(user);
      return user;
    } else {
      throw new CustomHttpException({
        code: 400,
        success: false,
        message: 'Invalid Otp',
      });
    }
  }

  getToken(payload: IJwtPayload) {
    return jwt.sign(payload, this.config.get<Config>().envs().APP_SECRETE);
  }

  varifyToken(token: string): jwt.JwtPayload | string | null {
    try {
      const payload = jwt.verify(
        token,
        this.config.get<Config>().envs().APP_SECRETE,
      );
      return payload;
    } catch (error) {
      throw new CustomHttpException({
        code: HttpStatus.UNAUTHORIZED,
        success: false,
      });
    }
  }
}
