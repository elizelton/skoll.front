import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { LoginService } from '../pages/login/login.service';
import { catchError, mergeMap } from 'rxjs/operators';
import { PoHttpRequestInterceptorService } from '@po-ui/ng-components';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class InterceptorModule implements HttpInterceptor {

  token = JSON.parse(localStorage.getItem('usuario'))?.accessToken;

  constructor(private loginService: LoginService,
    private httpRequestInterceptor: PoHttpRequestInterceptorService
    ) {

  }


  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {

    // this.httpRequestInterceptor.intercept()

    if (this.token)
      request = this.addToken(request, this.token);

    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && (error.status === 401) && this.token) {
          return this.handleError(request, next);
        }
        else if (error.message === "Refresh Token inválido") {
          this.loginService.logout();
          return throwError(error);
        }
        else {
          return throwError(error);
        }
      }
      ));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  private handleError(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.loginService.refreshToken()
      .pipe(mergeMap((token: any) => {
        return next.handle(this.addToken(request, token.accessToken));
      })));
  }
}
