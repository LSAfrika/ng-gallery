import { takeUntil,tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
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


  Destroy$=new Subject()

  notifications$=    this.notifications.getnotfications().pipe(takeUntil(this.Destroy$),tap(res=>{
    if (res.length < 5) this.notifications.disablenotificationbutton = true;
    console.log('fetched notification',res);
    this.notifications.notifications$.next(res)}

  ))



  constructor(public ui: UiService,public notifications: NotificationsService,private router:Router) {
    this.notifications.notifications$.subscribe(val=>console.log(val));
    // this.notifications.getnotfications().pipe(takeUntil(this.Destroy$)).subscribe(res=>{
    //   if (res.length < 5) this.notifications.disablenotificationbutton = true;
    //   console.log('fetched notification',res);
    //   notifications.notifications$.next(res)}

    // )}
  }
  ngOnInit(): void {}

  ngOnDestroy(){
    this.Destroy$.next()
    this.Destroy$.complete()
  }


  navigatetopost(id){

    const url=`/snapshare/${id}`
    // console.log(url);

    this.ui.togglenotifications()
    this.router.navigateByUrl(url)
  }

  fetchnextnotifications(){
    this.notifications.fetchnextsetofnotifications()
  }

}
