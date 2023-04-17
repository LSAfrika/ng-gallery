import { UiService } from './../../services/ui.service';
import { IOService } from './../../services/io.service';
import { Message } from './../../interface/messages.interface';
// import { ApiService } from '../../services/notifications.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil,map } from 'rxjs/operators';
import jwtDecode from 'jwt-decode';
import {Platform}from '@angular/cdk/platform';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  destroy: Subject<boolean> = new Subject<boolean>();
  constructor(private router: Router, private auth: AuthService,private io:IOService,private ui:UiService,public platform: Platform) { }

  ngOnInit(): void {

    this.router.navigate(['/'])
    // this.api.getallposts().subscribe(console.log)
    // this.auth.googlesignin()
const    userAgent = window.navigator.userAgent;
      console.log(this.platform);
      if(this.platform.ANDROID){
        // alert('working on android platform ')

      }
  }

  // tslint:disable-next-line: typedef
  loginwithfacebook(){
 this.router.navigateByUrl('/');
  }
  loginwithgoogle(){
    // this.router.navigateByUrl('/')
    this.auth.googlesignin().pipe(takeUntil(this.destroy), take(1)).subscribe((result) => {
      console.log(result);
      this.router.navigateByUrl('/');

   });
     }

     logintest(){
      alert('testing signin')
      this.auth.testsignin()
      .pipe(takeUntil(this.destroy),map((result:any )=>{

        console.log('result from server login',result);
        // this.logedinuser = result;
        // this.storagetoken = result.token;
        localStorage.setItem('auth', result.token);
        localStorage.setItem('refresh', result.refreshtoken);

        const loginvalue:any = jwtDecode(result.token)
        this.ui.logedinuser=loginvalue
        console.log('decoded token value', this.ui.logedinuser);
        this.io.setsocketinstanceonlogin()
        return result
      }))
      .subscribe(res=>{
         alert(res)
        console.log(res);

        this.router.navigateByUrl('/')

      },err=>{
        console.log(err);
 alert(err )
      })
     }



     // tslint:disable-next-line: use-lifecycle-interface
     ngOnDestroy(){
      this.destroy.next(true);
      this.destroy.unsubscribe();
     }
}
