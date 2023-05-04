import { takeUntil } from 'rxjs/operators';
import { MessagesService } from './../../services/messages.service';
import { NotificationsService } from './../../services/notifications.service';
import {  User } from './../../interface/post.interface';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { of, Subject } from 'rxjs';
import { Location } from '@angular/common'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {



  @Input()postowner:User
  route=''
  routarray
  title=''
  destroy=new Subject()
  fulldayinmilliseconds=86400000
  currentdate=Date.now()
  messagecounter=0
  notifictioncounter=0



  constructor(public ui:UiService,private router:Router,private notfier:NotificationsService,public msgservice:MessagesService,
    private location: Location,private notificationservice:NotificationsService
    ) { }

  ngOnInit(): void {

    this.route=this.router.url.split('/')[1]
    //  console.log(this.router.url.split('/'));
    //  console.log('current route: ',this.route);
if(this.route==='') {this.title='snapshare'
this.msgservice.fetchsunreadmessages().pipe(takeUntil(this.destroy)).subscribe((res:any)=>{this.messagecounter=res.count})
this.notificationservice.fetchnotificationcount().pipe(takeUntil(this.destroy)).subscribe((res:any)=>{this.notifictioncounter=res.count})

}
if(this.route==='profile') this.title='profile'
if(this.route==='messages') this.title='messages'
if(this.route==='directmessage') this.title='messages'


}

ngOnDestroy(){
  this.destroy.next()
}

logout(){
  localStorage.clear()
  this.router.navigateByUrl('/login')
}



back() {
  this.location.back()
}

  profile(){
    this.ui.user()
    this.router.navigate([`profile/${this.ui.logedinuser._id}`])
  }

  viewprofile(){
    // console.log('post owner: ',this.ui.postowner.value);

    this.ui.resetnotificationpanel()

    // remember to add logic for login user profile navigation
    this.router.navigate(['profile',this.ui.postowner.value._id])

  }

  viewprofilefromdm(){
    this.ui.resetnotificationpanel()
    this.router.navigate(['profile',this.ui.chatowner.value._id])


  }


  textuser(){
    this.ui.directmessagepanel.next(3)
    this.router.navigate(['messages'])
  }
  messages(){
    this.router.navigate(['messages'])
    this.ui.resetnotificationpanel()

  }

  home(){
    this.ui.resetnotificationpanel()
    this.ui.postowner.next(undefined)
    // console.log('reset profile',this.ui.postowner.value);

    this.router.navigate([''])
  }

}
