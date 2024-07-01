import { HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { UserType } from 'src/utils/enums/userType';
import { RegisterDto } from './dto/register.dto';
import { CustomHttpException } from 'src/utils/Exceptions/CustomHttpException';
import {
  IJwtPayload,
  JWTConfirmEmailPayload,
  JWTResetPasswordPayload,
} from 'src/utils/types/common';
import User from '../users/entities/user.entity';
import { DataSource } from 'typeorm';
import { compareSync } from 'bcrypt';
import { confirmEmailDto } from './dto/confirmEmail.dto';
import { UserRepository } from 'src/users/user.repository';
import { ProfileRepository } from 'src/profiles/profile.repository';
import { MailsService } from 'src/mails/mails.service';
import { forgotPasswordOtpDto } from './dto/forgotPasswordOtp.dto';
import { resetPasswordDto } from './dto/resetPassword.dto';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from 'src/config/app.config';
import {
  EMAIL_VERIFY_TOKEN_EXPIRY,
  PASSWORD_RESET_TOKEN_EXPIRY,
} from 'src/utils/consts';

@Injectable()
export class AuthService {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    private config: ConfigService,
    private mailservice: MailsService,
    private userRepo: UserRepository,
    private profileRepo: ProfileRepository,
  ) {}

  async login(dto: LoginDto): Promise<User> {
    const user = await this.userRepo.findOneByOrFail({
      email: dto.email,
    });

    if (!user) {
      throw new CustomHttpException({
        code: HttpStatus.UNAUTHORIZED,
        success: false,
        message: 'Login Failed',
      });
    }

    if (!user.isActive || !user.emailVerified) {
      throw new CustomHttpException({
        code: HttpStatus.UNAUTHORIZED,
        success: false,
        message: 'Account is inactive or unverified',
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
    const userExist = await this.userRepo.findOne({
      where: {
        email: dto.email,
      },
    });

    if (userExist) {
      throw new CustomHttpException({
        code: HttpStatus.UNPROCESSABLE_ENTITY,
        success: false,
        message: 'Account already exist',
      });
    }

    return this.dataSource.transaction(async (manager) => {
      const user = this.userRepo.create(dto);
      user.userType = UserType.CUSTOMER;
      user.isActive = true;

      const savedUser = await manager.save(user);
      const profile = this.profileRepo.create({});
      profile.user = savedUser;

      await manager.save(profile);

      const token = this.getToken(
        { tokenType: 'confirm-email', email: user.email },
        { expiresIn: EMAIL_VERIFY_TOKEN_EXPIRY },
      );

      const link = `${this.config.get<AppConfig>('appConfig')?.appUrl}/auth/confirm-email?jwt=${token}`;

      await this.mailservice.sendAccountCreatedEmail(user.email, {
        name: user.firstName,
        link,
      });

      return user;
    });
  }

  async confirmEmail(dto: confirmEmailDto): Promise<User> {
    const payload = this.varifyToken(dto.jwt) as JWTConfirmEmailPayload;

    if (payload.tokenType !== 'confirm-email') {
      throw new CustomHttpException({
        code: HttpStatus.BAD_REQUEST,
        success: false,
        message: 'Invalid Token',
      });
    }

    const user = await this.userRepo.findOneByOrFail({
      email: payload.email,
    });

    user.emailVerified = true;
    await this.userRepo.save(user);
    return user;
  }

  async forgotPasswordOtp(dto: forgotPasswordOtpDto) {
    const user = await this.userRepo.findOneByOrFail({
      email: dto.email,
    });

    await this.userRepo.save(user);

    const token = this.getToken(
      { tokenType: 'reset-password', id: user.id },
      { expiresIn: PASSWORD_RESET_TOKEN_EXPIRY },
    );
    const link = `${this.config.get<AppConfig>('appConfig')!.appUrl}/auth/reset-password?jwt=${token}`;

    await this.mailservice.sendForgotPassqordEmail(user.email, {
      name: user.firstName,
      link,
    });
  }

  async resetPassword(dto: resetPasswordDto): Promise<User> {
    const payload = this.varifyToken(dto.jwt) as JWTResetPasswordPayload;

    if (payload.tokenType !== 'reset-password' && !payload?.id) {
      throw new CustomHttpException({
        code: 400,
        success: false,
        message: 'Invalid token',
      });
    }

    const user = await this.userRepo.findOneByOrFail({
      id: payload.id,
    });

    user.password = dto.password;
    await this.userRepo.save(user);
    return user;
  }

  getToken(payload: IJwtPayload, opt?: jwt.SignOptions) {
    return jwt.sign(
      payload,
      this.config.get<AppConfig>('appConfig')!.appSecrete,
      opt,
    );
  }

  varifyToken(token: string): jwt.JwtPayload | string | null {
    try {
      const payload = jwt.verify(
        token,
        this.config.get<AppConfig>('appConfig')!.appSecrete,
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
