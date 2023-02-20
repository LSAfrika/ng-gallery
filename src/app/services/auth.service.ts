import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { initializeApp } from 'firebase/app';
import { map, switchMap } from 'rxjs/operators';

import {
  getAuth,
  GoogleAuthProvider,
 FacebookAuthProvider,
  signInWithPopup,

} from 'firebase/auth';
import {BehaviorSubject, from,  Observable, Subject } from 'rxjs';
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
logedinuser: any = {};
storagetoken = '';
firebasetokenvalue = '';
   auth = getAuth();
   token = '';
   firebasetoken = '';

   homerouteactivation = false;
   googleprovider = new GoogleAuthProvider();
   loginresult: Observable<any>;
   guardactivation: Subject<boolean> = new Subject <boolean>();

  constructor(private api: ApiService) {
    console.log('auth service initialized');


  }

//   async googlesignin() {
//     // try {

// const signingoogle = from(  signInWithPopup(this.auth, this.googleprovider));

// signingoogle.subscribe(async (user) => {
//   const token = await user.user.getIdToken();

//   this.api.signinuser(token).subscribe(console.log);
//   console.log('user token', token);

// });

//   }

   googlesignin(): Observable<any>{
    // try {

const signingoogle = from(  signInWithPopup(this.auth, this.googleprovider));
return signingoogle .pipe(
  map((result: any) => {
  this.firebasetokenvalue = result.user.accessToken;
  return result.user.accessToken ;
}),
switchMap((token: string) => this.api.signinuser(token)),
map((result: any) => {console.log(result);
                      // this.logedinuser = result;
                      // this.storagetoken = result.token;
                      localStorage.setItem('auth', result.token);
                      //  this.homerouteactivation = true;
                      // this.guardactivation.next(true);
                      // console.log(this.homerouteactivation);
                      return result; }));

  }

  gettoken(){
    return localStorage.getItem('auth')
  }


}
