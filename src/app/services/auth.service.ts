import { PostService } from './Post.service';
import { User } from './../interface/post.interface';
// import { ApiService } from './notifications.service';
import { Inject, Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { initializeApp } from 'firebase/app';
import { map, switchMap } from 'rxjs/operators';
import jwtDecode from 'jwt-decode';

import {
  getAuth,
  GoogleAuthProvider,
 FacebookAuthProvider,
  signInWithPopup,

} from 'firebase/auth';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, from,  Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { UiService } from './ui.service';
import { IOService } from './io.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  firebaseConfig = {
    apiKey: 'AIzaSyD4_u1IjJQp0aT1pPtE846Xi3q3kSOOZy4',
    authDomain: 'snapshare-ke.firebaseapp.com',
    projectId: 'snapshare-ke',
    storageBucket: 'snapshare-ke.appspot.com',
    messagingSenderId: '827667811702',
    appId: '1:827667811702:web:72beedc72532a9abaa3e57'
  };

  // Initialize Firebase
   app = initializeApp(this.firebaseConfig);

storagetoken = '';
firebasetokenvalue = '';
   auth = getAuth();
   token = '';
   firebasetoken = '';
   refreshurl='http://localhost:4555/user/refresh'
loginurl = 'http://localhost:4555/user/authprovidersignin';


   homerouteactivation = false;
   googleprovider = new GoogleAuthProvider();
   loginresult: Observable<any>;
   guardactivation: Subject<boolean> = new Subject <boolean>();
   snapshare=Inject(PostService)
  constructor(private http:HttpClient,private router:Router,private ui:UiService,private io:IOService) {
    console.log('auth service initialized');

  }





   googlesignin(): Observable<any>{
    // try {

const signingoogle = from(  signInWithPopup(this.auth, this.googleprovider));
return signingoogle .pipe(
  map((result: any) => {
  this.firebasetokenvalue = result.user.accessToken;
  // console.log('firebasetoken:\n',this.firebasetokenvalue);

  return result.user.accessToken ;
}),
switchMap(() => {
  // console.log('received token\n',token);
  return this.signinuser()}),
map((result: any) => {console.log('result from server login',result);
                      // this.logedinuser = result;
                      // this.storagetoken = result.token;
                      localStorage.setItem('auth', result.token);
                      localStorage.setItem('refresh', result.refreshtoken);

                      const loginvalue:any = jwtDecode(result.token)
                      this.ui.logedinuser=loginvalue
                      console.log('decoded token value', this.ui.logedinuser);
                      this.io.setsocketinstanceonlogin()

                      // this.snapshare.fetchsubscriptionlogic()
                      //  this.homerouteactivation = true;
                      // this.guardactivation.next(true);
                      // console.log(this.homerouteactivation);
                      return result; }));

  }

  gettoken(){
    return localStorage.getItem('auth')
  }

  signinuser(): Observable<any>{
    // tslint:disable-next-line: max-line-length
    // console.log(token)
    return this.http.post(this.loginurl,{})
    // ,{ headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)}
   }

  refreshtoken(){
    const token=localStorage.getItem('auth')
    const refreshtoken=localStorage.getItem('refresh')

    // console.log('token to refresh',token)
    return this.http.post(this.refreshurl,{},{ headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('refreshtoken',`bearer ${refreshtoken}`) })

  }

  navigatehome(){
    this.router.navigate(['login'])
  }

  setloginuser(){
    const token=localStorage.getItem('auth')
    if(token===undefined || token==='undefined') return
    this.ui.logedinuser=jwtDecode(token)
  }

}
