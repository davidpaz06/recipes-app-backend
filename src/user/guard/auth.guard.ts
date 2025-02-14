import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log('GUARD');
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      return false;
    }
    try {
      const payload = this.jwtService.verify(token);
      console.log('Payload: ', payload);
      request.user = payload;
    } catch {
      return false;
    }
    return true;
  }

  private extractTokenFromHeader(request: any): string | null {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }
}
