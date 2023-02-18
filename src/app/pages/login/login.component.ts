import { ApiService } from './../../services/api.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService, private api: ApiService) { }

  destroy: Subject<boolean> = new Subject<boolean>();
  ngOnInit(): void {

    this.router.navigate(['/home'])
    // this.api.getallposts().subscribe(console.log)
    // this.auth.googlesignin()
  }

  // tslint:disable-next-line: typedef
  loginwithfacebook(){
 this.router.navigateByUrl('/home');
  }
  loginwithgoogle(){
    // this.router.navigateByUrl('/home')
    this.auth.googlesignin().pipe(takeUntil(this.destroy), take(1)).subscribe((result) => {
      console.log(result);
      this.router.navigateByUrl('/home');

   });
     }


     // tslint:disable-next-line: use-lifecycle-interface
     ngOnDestroy(){
      this.destroy.next(true);
      this.destroy.unsubscribe();
     }
}
