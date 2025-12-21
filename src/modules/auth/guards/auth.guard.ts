import { Request } from 'express';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

function validateRequest(request: Request): boolean {
  const authHeader = request.headers['Authorization'];

  if (!authHeader || typeof authHeader !== 'string') return false;
  if (!authHeader.startsWith('Basic ')) return false;

  const baseCredentials = authHeader.replace('Basic ', '');
  const [email, password] = baseCredentials.split(':');

  return !!email && !!password;
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    return validateRequest(request);
  }
}
