import { map, switchMap, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostService } from './Post.service';
import jwt_decode from 'jwt-decode';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  loginurl = 'http://localhost:4555/user/authprovidersignin';
  refreshurl = 'http://localhost:4555/user/refresh';
  posturl = 'http://localhost:4555/photos/post';
  commenturl = 'http://localhost:4555/comments/post/';
  likesurl = 'http://localhost:4555/likes/post/';
  authrequest: HttpRequest<unknown>;
  postrequest: HttpRequest<unknown>;
  commentrequest: HttpRequest<unknown>;
  likerequest: HttpRequest<unknown>;
  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {

  //  const commenposturl=this.commenturl+this.post.postid
  //  const likeposturl=this.likesurl+this.post.postid
  // console.log('global scope interceptor',request.url)

  if (request.url === this.loginurl) {console.log(request.url); return this.logininterceptor(request, next); }


     return this.refreshtokeninterceptor(request, next);






  }

  refreshtokeninterceptor(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>>{
    const token: any = localStorage.getItem('auth');
    // const refresh=localStorage.getItem('refresh')

    const tokenvalue: any = jwt_decode(token);
    // console.log('in refresh interceptor',req.url)

    if(req.url===this.refreshurl) return next.handle(req)

    if (req.method === 'POST' && req.url != this.loginurl){

      if (tokenvalue.exp * 1000 > Date.now() ) {

        console.log();

        const postrequest = req.clone({
        setHeaders: {
          Authorization: 'bearer ' + token
        }
       });
        return next.handle(postrequest);

      }

      return  this.auth.refreshtoken().pipe(switchMap(
      (tokens: any) => {
        localStorage.setItem('auth', tokens.token);

        const reqclone = req.clone({
          setHeaders: {
            Authorization: 'bearer ' + tokens.token
          }
        });
        return next.handle(reqclone);
      }



    ));


    }

    return next.handle(req);

  }




  postinterceptor(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log (request.url , request.method );
    const token = this.auth.gettoken();
    // console.log('token in auth interceptor', token);
    this.postrequest = request.clone({
        setHeaders: {
          Authorization: 'bearer ' + token
        }
      });

    return next.handle(this.postrequest).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 401){
        return this.auth.refreshtoken().pipe(switchMap((tokens: any) => {

                  const newtoken = tokens.token;
                  localStorage.setItem('auth', newtoken);
                  const newrequest = request.clone({
                    setHeaders: {
                      Authorization: 'bearer ' + newtoken
                    }
                  });

                  return next.handle(newrequest);

        }



        ));

      }
    }));


    }


  logininterceptor(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {


      const token = this.auth.firebasetokenvalue;
console.log('interceptor token\n',token);

      this.authrequest = request.clone({
        setHeaders: {
          Authorization: 'bearer ' + token
        }
      });
      console.log('auth header',this.authrequest.headers.get('Authorization'));


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

    return next.handle(this.commentrequest).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 401){
        return this.auth.refreshtoken().pipe(switchMap((tokens: any) => {

                  const newtoken = tokens.token;
                  localStorage.setItem('auth', newtoken);

                  const newrequest = request.clone({
                    setHeaders: {
                      Authorization: 'bearer ' + newtoken
                    }
                  });

                  return next.handle(newrequest);

        }



        ));

      }
    }));




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

  return next.handle(this.likerequest)
  .pipe(catchError((err: HttpErrorResponse) => {
    if (err.status === 401){
      return this.auth.refreshtoken().pipe(switchMap((tokens: any) => {

                const newtoken = tokens.token;
                localStorage.setItem('auth', newtoken);

                const newrequest = request.clone({
                  setHeaders: {
                    Authorization: 'bearer ' + newtoken
                  }
                });

                return next.handle(newrequest);

      }



      ));

    }
  }));



}



}
