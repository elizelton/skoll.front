import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class InterceptorModule implements HttpInterceptor {

  token = JSON.parse(localStorage.getItem('usuario'))?.accessToken;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {

    if (this.token) {
      const dupReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.token)
      });
      return next.handle(dupReq);
    } else {
      return next.handle(req);
    }
  }
}
