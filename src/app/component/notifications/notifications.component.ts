import { NotificationsService } from './../../services/notifications.service';
import { UiService } from 'src/app/services/ui.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  constructor(public ui: UiService,public notifications: NotificationsService,private router:Router) { }

  ngOnInit(): void {


  // console.log(this.notifications.notifications$.value);
  this.notifications.notifications$.subscribe(val=>console.log(val));
console.log(this.notifications.disablenotificationbutton);




  }


  navigatetopost(id){

    const url=`/snapshare/${id}`
    console.log(url);

    this.ui.togglenotifications()
    this.router.navigateByUrl(url)
  }

  fetchnextnotifications(){
    this.notifications.fetchnextsetofnotifications()
  }

}
