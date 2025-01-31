import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body } = request;

    console.log(`Incoming Request: ${method} ${url}`);
    console.log('Request Body:', body);

    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const { statusCode } = response;
        console.log(`Outgoing Response: ${statusCode} ${url}`);
        console.log(`Request-Response Time: ${Date.now() - now}ms`);
      }),
    );
  }
}
