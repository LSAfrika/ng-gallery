import { takeUntil, tap, map } from 'rxjs/operators';
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
  fulldayinmilliseconds=86400000
  currentdate=Date.now()

  notifications$=    this.notifications.getnotfications().pipe(takeUntil(this.Destroy$),
  map((res:any)=>{

// const mapednotifications=

return res.map(notice=>{
let dateparse=Date.parse(notice.createdAt)
return {
  ...notice,
  createdAt:dateparse
}
}
)

})
   ,tap((res:any)=> {
  //  console.log('tap notification output',res);

   if (res.length < 5) this.notifications.disablenotificationbutton = true;
    // this.notifications.notifications$.next(res)
  })

    )



  constructor(public ui: UiService,public notifications: NotificationsService,private router:Router) {

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
