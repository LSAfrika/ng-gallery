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
import jwt_decode from 'jwt-decode'

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
    //  this.refreshtoken(request,next)
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

    return next.handle(this.postrequest).pipe(catchError((err:HttpErrorResponse)=>{
      if(err.status===401){
        return this.auth.refreshtoken().pipe(switchMap(tokens=>{

                  const newtoken=tokens.token;
                  localStorage.setItem('auth',newtoken)
                  const newrequest=request.clone({
                    setHeaders: {
                      Authorization: 'bearer ' + newtoken
                    }
                  })

                  return next.handle(newrequest)

        }



        ))

      }
    }));
  ;

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

    return next.handle(this.commentrequest).pipe(catchError((err:HttpErrorResponse)=>{
      if(err.status===401){
        return this.auth.refreshtoken().pipe(switchMap(tokens=>{

                  const newtoken=tokens.token;
                  localStorage.setItem('auth',newtoken)

                  const newrequest=request.clone({
                    setHeaders: {
                      Authorization: 'bearer ' + newtoken
                    }
                  })

                  return next.handle(newrequest)

        }



        ))

      }
    }));
  ;



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
  .pipe(catchError((err:HttpErrorResponse)=>{
    if(err.status===401){
      return this.auth.refreshtoken().pipe(switchMap(tokens=>{

                const newtoken=tokens.token;
                localStorage.setItem('auth',newtoken)

                const newrequest=request.clone({
                  setHeaders: {
                    Authorization: 'bearer ' + newtoken
                  }
                })

                return next.handle(newrequest)

      }



      ))

    }
  }));



}



// refreshtoken(request:HttpRequest<any>,next:HttpHandler): Observable<HttpEvent<any>>{

//   const token=localStorage.getItem('auth')
// const decodedtoken:any= jwt_decode(token)
// console.log('tokendetails:\n',decodedtoken);

//   if(decodedtoken.exp*1000<Date.now()){
// console.log('token expired');

// return this.auth.refreshtoken().pipe(map(tokens=>{
//   console.log(tokens);
//   localStorage.setItem('auth', tokens.token);
//   localStorage.setItem('refresh', tokens.refreshtoken);
//   return tokens.token
// }),switchMap(token=>{
//  const req= request.clone({
//     setHeaders: {
//       Authorization: 'bearer ' + token
//     }
//   });

//   return next.handle(req);

// }


// ))

//   }

//   return next.handle(request)

// }

}
