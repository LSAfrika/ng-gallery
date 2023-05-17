import { PostService } from 'src/app/services/Post.service';
import { takeUntil, tap, map, switchMap } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
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


  Destroy$ = new Subject()
  fulldayinmilliseconds = 86400000
  currentdate = Date.now()
  viewnotificationsubscription:Subscription

  notifications$ =this.notifications.notificationpagination$.pipe(
    switchMap((notifier:number)=> {
      console.log('notification page number',notifier);

    return  this.notifications.getnotfications()}),
         map((res: any) => {

        // const mapednotifications=
        if (res.length < 10) this.notifications.disablenotificationbutton = true;
          console.log('fetched notification size',res);

        res.map(notice => {
          let dateparse = Date.parse(notice.createdAt)



          this.notifications.notifications$.next([...this.notifications.notifications$.value, { ...notice, createdAt: dateparse }])

        })
      //  return []
return this.notifications.notifications$.value


})
   , tap((res: any) => {
          // console.log('tap notification output', res.length);

          // this.notifications.notifications$.next(res)
        })

    )



constructor(public ui: UiService, public notifications: NotificationsService, private router: Router,private snapshareservice:PostService) {
  console.log('notification componentn is working');


  }
ngOnInit(): void {
  // console.log('notifications panel number', this.ui.opennotificationspanel);

}


fetchnextnotifications(){
  this.notifications.notificationpagination$.next(this.notifications.notificationpagination$.value + 1)
  console.log('current notfiction pagination', this.notifications.notificationpagination$.value);

}

ngOnDestroy(){
  this.Destroy$.next()
  this.Destroy$.complete()
}


navigatetopost(id){

  const url = `/snapshare/${id}`
  // console.log(url);

  this.ui.togglenotifications()
  // console.log('notifications panel number',this.ui.opennotificationspanel);



  this.router.navigateByUrl(url)

}

navigatetouserprofile(id,viewed){

  const url = `/profile/${id}`
   console.log('notification view status: ',viewed);

  this.ui.togglenotifications()
  // console.log('notifications panel number',this.ui.opennotificationspanel);



  this.router.navigateByUrl(url)

  if(viewed==true) return

 this. viewnotificationsubscription= this.snapshareservice.updateprofilenotificationtoviewed(id).subscribe(res=>{
  console.log(res);
  this.viewnotificationsubscription.unsubscribe()

 })

}

}



