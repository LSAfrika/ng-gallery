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

  loginurl='http://localhost:4555/user/authprovidersignin'
  authrequest:HttpRequest<unknown>
  constructor(private auth:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {

    console.log(request.url)
    if(request.url === this.loginurl){
      const token = this.auth.firebasetokenvalue
      console.log('token in auth interceptor',token)
       this.authrequest=request.clone({
        setHeaders:{
          Authorization: 'bearer '+ token
        }
      })

    return next.handle(this.authrequest);

    }
    // if(request.)
    return next.handle(request);
  }
}
