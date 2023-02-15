import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {  CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {





  constructor(private auth:AuthService){}
  canActivate(
    ): Observable<boolean >  {
    return of(true);
  }

}
