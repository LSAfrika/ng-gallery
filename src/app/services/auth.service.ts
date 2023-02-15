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

} from 'firebase/auth'
import { from } from 'rxjs';
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


   auth = getAuth();
   token = '';
   firebasetoken = '';
   googleprovider = new GoogleAuthProvider();

  constructor(private api:ApiService) {
    console.log('auth service initialized');

  }

  async googlesignin() {
    // try {

const signingoogle = from(  signInWithPopup(this.auth, this.googleprovider));

signingoogle.subscribe(async (user) => {
  const token = await user.user.getIdToken();

  this.api.signinuser(token).subscribe(console.log)
  console.log('user token', token);

});
      // const signinresult =
      //  signInWithPopup(this.auth, this.googleprovider)
      //   console.log('result form google sign in:', signinresult);
      // const fbtoken = await signinresult.user.getIdToken()
      // this.firebasetoken = fbtoken

      //  localStorage.setItem('firebasetoken', this.firebasetoken)
      // console.log('user body: ', fbtoken);



    // } catch (error: any) {

      // console.log(error.message);





    // }
  }

  async googlesigninobserve() {
    // try {

const signingoogle = from(  signInWithPopup(this.auth, this.googleprovider));

signingoogle.pipe(map((result:any) => {
  // console.log(result.user.accessToken);
   return result.user.accessToken ;
}),switchMap((token:string)=>this.api.signinuser(token))).subscribe();

// console.log(backendtoken);

      // const signinresult =
      //  signInWithPopup(this.auth, this.googleprovider)
      //   console.log('result form google sign in:', signinresult);
      // const fbtoken = await signinresult.user.getIdToken()
      // this.firebasetoken = fbtoken

      //  localStorage.setItem('firebasetoken', this.firebasetoken)
      // console.log('user body: ', fbtoken);



    // } catch (error: any) {

      // console.log(error.message);





    // }
  }


}
