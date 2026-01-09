import { Request } from 'express';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/@types/express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    const token = request.headers['authorization']?.split(' ')[1] ?? '';
    if (!token) throw new UnauthorizedException('Bearer token not found');

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new UnauthorizedException('JWT secret not configured');

    try {
      const payload = this.jwtService.verify<JwtPayload>(token, { secret });
      payload.iat = new Date(payload.iat);
      payload.exp = new Date(payload.exp);
      request.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid Token');
    }
  }
}
