import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MessagesService } from './../../services/messages.service';
import { UiService } from 'src/app/services/ui.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  Destroy$=new Subject<boolean>()
  constructor(private ui:UiService,public msgservice:MessagesService,private router:Router) {

msgservice.fetchchatlist().pipe(takeUntil(this.Destroy$),
tap((res:any)=>msgservice.userchatlist$.next(res))).subscribe(console.log)

  }

  ngOnInit(): void {
  }

  ngOnDestroy(){

  }

  openmessage(){
    this.ui.directmessagepanel.next(1)
    console.log(this.ui.directmessagepanel.value)

  }



  textuser(id){

    // this.ui.directmessagepanel.next(3)

    this.router.navigate(['directmessage'+`/${id}`])
    console.log(this.ui.directmessagepanel.value)


}

}
