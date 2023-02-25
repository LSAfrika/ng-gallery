import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostService } from './Post.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  loginurl = 'http://localhost:4555/user/authprovidersignin';
  posturl = 'http://localhost:4555/photos/post';
  commenturl='http://localhost:4555/comments/post/'
  likesurl='http://localhost:4555/likes/post/'
  authrequest: HttpRequest<unknown>;
  postrequest: HttpRequest<unknown>;
  commentrequest: HttpRequest<unknown>;
  likerequest: HttpRequest<unknown>;
  constructor(private auth: AuthService,private post:PostService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {

   const commenposturl=this.commenturl+this.post.postid
   const likeposturl=this.likesurl+this.post.postid
     console.log(request.url);
    if (request.url === this.loginurl) {return this.logininterceptor(request,next) }
    if (request.url === this.posturl) {return this.postinterceptor(request,next) }
    if (request.url === commenposturl && request.method==='POST') {return this.commentinterceptor(request,next) }
    if (request.url === likeposturl && request.method==='POST') {return this.likesinterceptor(request,next) }

  return next.handle(request);




  }




  postinterceptor(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log (request.url ,request.method );
    const token = this.auth.gettoken();
    // console.log('token in auth interceptor', token);
    this.postrequest = request.clone({
        setHeaders: {
          Authorization: 'bearer ' + token
        }
      });

    return next.handle(this.postrequest);

    }


  logininterceptor(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {


      const token = this.auth.firebasetokenvalue;
      // console.log('token in auth interceptor', token);
      // console.log('post link', request.url);
      this.authrequest = request.clone({
        setHeaders: {
          Authorization: 'bearer ' + token
        }
      });

      return next.handle(this.authrequest);



  }

  commentinterceptor(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {


    const token = this.auth.gettoken();

    //  console.log('token in comment interceptor', token);
    // console.log('post link', request.url);
    this.commentrequest = request.clone({
      setHeaders: {
        Authorization: 'bearer ' + token
      }
    });

    return next.handle(this.commentrequest);



}

likesinterceptor(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {


  const token = this.auth.gettoken();

  //  console.log('token in comment interceptor', token);
  // console.log('post link', request.url);
  this.likerequest = request.clone({
    setHeaders: {
      Authorization: 'bearer ' + token
    }
  });

  return next.handle(this.likerequest);



}

}
