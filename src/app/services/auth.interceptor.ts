import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  loginurl = 'http://localhost:4555/user/authprovidersignin';
  posturl = 'http://localhost:4555/photos/post';
  authrequest: HttpRequest<unknown>;
  postrequest: HttpRequest<unknown>;
  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {

    // / console.log(request.url);
    if (request.url === this.loginurl) {return this.logininterceptor(request,next) }
    if (request.url === this.posturl) {return this.postinterceptor(request,next) }

  return next.handle(request);




  }




  postinterceptor(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log (request.url );
    const token = this.auth.gettoken();
    console.log('token in auth interceptor', token);
    this.postrequest = request.clone({
        setHeaders: {
          Authorization: 'bearer ' + token
        }
      });

    return next.handle(this.postrequest);

    }


  logininterceptor(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {


      const token = this.auth.firebasetokenvalue;
      console.log('token in auth interceptor', token);
      console.log('post link', request.url);
      this.authrequest = request.clone({
        setHeaders: {
          Authorization: 'bearer ' + token
        }
      });

      return next.handle(this.authrequest);



  }
}
