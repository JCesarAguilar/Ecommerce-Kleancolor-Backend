import 'express-serve-static-core';
import { Role } from 'src/modules/auth/enums/roles.enum';

export interface JwtPayload {
  sub: string;
  email: string;
  role: Role.ADMIN | Role.USER;
  iat: Date;
  exp: Date;
}

declare module 'express-serve-static-core' {
  interface Request {
    user: JwtPayload;
  }
}
