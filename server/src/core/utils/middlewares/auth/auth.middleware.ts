import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@salman3001/nest-config-module';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { Config } from 'src/core/config/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly config: ConfigService) {}
  use(req: Request, res: Response, next: () => void) {
    const auth_token = req.cookies?.auth_token;

    if (!auth_token) {
      req['user'] = null;
    } else {
      const payload = this.varifyToken(auth_token);
      if (!payload) {
        req['user'] = null;
      } else {
        req['user'] = payload;
      }
    }

    next();
  }

  varifyToken(token: string): jwt.JwtPayload | string | null {
    try {
      const payload = jwt.verify(
        token,
        this.config.get<Config>().envs().APP_SECRETE,
      );
      return payload;
    } catch (error) {
      return null;
    }
  }
}
