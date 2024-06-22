import { HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { Config } from 'src/core/config/config';
import { resetPasswordDto } from './dto/forgotPasswordOtp.dto';
import { UserType } from 'src/core/utils/enums/userType';
import { RegisterDto } from './dto/register.dto';
import { forgotPasswordOtpDto } from './dto/resetPassword.dto';
import { ConfigService } from '@salman3001/nest-config-module';
import { CustomHttpException } from 'src/core/utils/Exceptions/CustomHttpException';
import { IJwtPayload } from 'src/core/utils/types/common';
import User from '../users/entities/user.entity';
import { DataSource } from 'typeorm';
import { compareSync } from 'bcrypt';
import { confirmEmailDto } from './dto/confirmEmail.dto';
import { UserRepository } from 'src/users/user.repository';
import { ProfileRepository } from 'src/profiles/profile.repository';
import { MailsService } from 'src/mails/mails.service';

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
    const user = await this.userRepo.findOneBy({
      email: dto.email,
    });

    if (!user) {
      throw new CustomHttpException({
        code: HttpStatus.UNAUTHORIZED,
        success: false,
        message: 'Login Failed',
      });
    }

    if (!user.isActive) {
      throw new CustomHttpException({
        code: HttpStatus.UNAUTHORIZED,
        success: false,
        message: 'Account is inactive',
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
      user.isActive = false;

      const savedUser = await manager.save(user);
      const profile = this.profileRepo.create({});
      profile.user = savedUser;

      await manager.save(profile);

      const token = this.getToken(
        { id: user.id, userType: user.userType },
        { expiresIn: 60 * 60 * 24 * 365 },
      );

      const link = `${this.config.get<Config>().envs().APP_URL}/auth/confirm-email?jwt=${token}`;

      await this.mailservice.sendAccountCreatedEmail(user.email, {
        name: user.firstName,
        link,
      });

      return user;
    });
  }

  async confirmEmail(dto: confirmEmailDto): Promise<User> {
    const payload = this.varifyToken(dto.jwt) as IJwtPayload;

    const user = await this.userRepo.findOneByOrFail({
      id: payload.id,
    });

    user.isActive = true;
    await this.userRepo.save(user);
    return user;
  }

  async forgotPasswordOtp(dto: forgotPasswordOtpDto) {
    const user = await this.userRepo.findOneByOrFail({
      email: dto.email,
    });

    await this.userRepo.save(user);

    const token = this.getToken(
      { id: user.id, userType: user.userType },
      { expiresIn: 60 * 10 },
    );
    const link = `${this.config.get<Config>().envs().APP_URL}/auth/reset-password?jwt=${token}`;

    await this.mailservice.sendForgotPassqordEmail(user.email, {
      name: user.firstName,
      link,
    });
  }

  async resetPassword(dto: resetPasswordDto): Promise<User> {
    const user = await this.userRepo.findOneByOrFail({
      email: dto.email,
    });

    const payload = this.varifyToken(dto.jwt) as IJwtPayload;

    if (payload?.id !== user.id) {
      throw new CustomHttpException({
        code: 400,
        success: false,
        message: 'Invalid token',
      });
    }

    user.password = dto.password;
    await this.userRepo.save(user);
    return user;
  }

  getToken(payload: IJwtPayload, opt?: jwt.SignOptions) {
    return jwt.sign(payload, this.config.get<Config>().envs().APP_SECRETE, opt);
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
