
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import * as fs from 'fs';

@Injectable()
export class FileCheckInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const userAgent = context.switchToHttp().getRequest();
    return next
    .handle()
    .pipe(
        catchError(
            err => {
                fs.unlinkSync(userAgent.file.path);
                throw err
            }
            ),
      );

  }
}