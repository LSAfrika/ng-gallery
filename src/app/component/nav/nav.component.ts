import { ViewComponent } from './../../pages/view/view.component';
import {  User } from './../../interface/post.interface';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { NotificationsComponent } from '../notifications/notifications.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(public ui:UiService,private router:Router,private notfier:NotificationsComponent) { }

  @Input()postowner:User
  route=''
  routarray
  title=''
  ngOnInit(): void {

    this.route=this.router.url.split('/')[1]
    console.log(this.router.url.split('/'));
    console.log('current route: ',this.route);
if(this.route==='') this.title='snapshare'
if(this.route==='profile') this.title='profile'
if(this.route===' messages') this.title='messages'
if(this.route==='view'){

  console.log(this.ui.postowner);
   setTimeout(() => {
    this.title=this.ui.postowner?.username
   },500);
  console.log(this.ui.postowner);

}


  }

  profile(){
    this.router.navigate(['profile'])
  }

  viewprofile(){
    console.log('post owner: ',this.ui.postowner);

    this.ui.resetnotificationpanel()

    // remember to add logic for login user profile navigation
    this.router.navigate(['profile',this.ui.postowner._id])

  }

  messages(){
    this.router.navigate(['messages'])
    this.ui.resetnotificationpanel()

  }

  home(){
    this.ui.resetnotificationpanel()
    this.router.navigate([''])
  }

}
