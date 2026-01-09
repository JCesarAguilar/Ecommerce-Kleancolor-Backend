import 'express-serve-static-core';

export interface JwtPayload {
  sub: string;
  email: string;
  iat: Date;
  exp: Date;
  roles?: string[];
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}
