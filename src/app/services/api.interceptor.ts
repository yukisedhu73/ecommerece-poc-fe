// src/app/services/api.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from './loading.service'; // import it

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Start loading
    this.loadingService.show();

    return next.handle(req).pipe(
      finalize(() => {
        // Always hide loading when request completes (success or error)
        this.loadingService.hide();
      })
    );
  }
}
