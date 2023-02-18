import { map } from 'rxjs/operators';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


activate;


  constructor(private auth: AuthService, private router: Router){}
  canActivate( ): boolean {

return true;
    const token = localStorage.getItem('auth');
    console.log('boolean for activation: ', token);

    if (token){

      return true;
    }else{
      this.router.navigate(['']);
      return false;
    }
    // return this.auth.guardactivation.asObservable()
    // pipe(map(result=>{result?this.router.navigateByUrl('/home'):this.router.navigateByUrl('/');return result}))

    // if
    // (this.auth.homerouteactivation ===true)
    // {this.router.navigateByUrl('/home');}
    // else{this.router.navigateByUrl('/');}

    // return this.auth.homerouteactivation

// return activate
  }

}
