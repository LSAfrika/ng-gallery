import { ApiService } from './../../services/api.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private auth:AuthService, private api:ApiService) { }

  ngOnInit(): void {

    this.api.getallposts().subscribe(console.log)
  }

  loginwithfacebook(){
 this.router.navigateByUrl('/home')
  }
  loginwithgoogle(){
    // this.router.navigateByUrl('/home')
    this.auth.googlesignin()
     }

}
