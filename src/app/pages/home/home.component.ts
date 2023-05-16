import { NotificationsService } from './../../services/notifications.service';
import { Component, OnInit } from '@angular/core';
import { IOService } from 'src/app/services/io.service';
// import { ApiService } from '../../services/notifications.service';
// import { NotifierService } from 'angular-notifier';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor(public ui:UiService,private io:IOService,public notificationservice:NotificationsService){

    // this.notifier=noticeservice
    // console.log('loggedin user ',this.ui.logedinuser);

  }

  ngOnInit(): void {
    // if(this.ui.logedinuser!==undefined &&  this.io.socketsetup==false ) {

    //   console.log('socket setup not done');

    //   this.io.setuid()

    // this.io.socketsetup=true
    // }

  }

}
