import { Usermessages } from './../../interface/messages.interface';
import { MessagesService } from './../../services/messages.service';
import { PostService } from './../../services/Post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { IOService } from '../../services/io.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, tap, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-directmessage',
  templateUrl: './directmessage.component.html',
  styleUrls: ['./directmessage.component.scss']
})
export class DirectmessageComponent implements OnInit {

  @ViewChild('chatthread') thread: any;
  @ViewChild('messendtosend') messagetosend: any;


  // destroy$=new Subject<boolean>()
  numberOfLineBreaks = 0;
items = [1, 1, 1, 1, 1];

textareaheight = 2;
userid = '';
message=''
destroy$ = new Subject<boolean>();
constructor(public ui: UiService, private router: Router,
   private io: IOService, private route: ActivatedRoute,
    private postservice: PostService,
    public messageservice:MessagesService
    ) {

  this.userid = this.route.snapshot.params.userid;
  console.log('current user', this.userid);

  if (this.ui.chatowner.value === undefined) { this.postservice.user(this.userid)
    .pipe(
      takeUntil(this.destroy$),
      map((res:any)=>{this.ui.chatowner.next(res.user);return res.user._id}),
      switchMap((userid:any)=>this.messageservice.fetchchat(userid)),
      tap((chat:any)=>{this.messageservice.userchat$.next(chat.chat.reverse());console.log('fetched user chat',this.messageservice.userchat$.value);
      })).
      subscribe() }


      if (this.ui.chatowner.value != undefined && this.ui.chatowner.value._id !== this.userid) { this.postservice.user(this.userid)
        .pipe(takeUntil(this.destroy$),
        map((res:any)=>{this.ui.chatowner.next(res.user);return res.user._id}),
        switchMap((userid:any)=>this.messageservice.fetchchat(userid)),
        tap((chat:any)=>{this.messageservice.userchat$.next(chat.chat);console.log('fetched user chat',this.messageservice.userchat$.value)})

        ).subscribe() }


// this.io.getNewMessage().pipe(takeUntil(this.destroy$),tap(res=>console.log(res))).subscribe()
  this.io.offlinenewmessage().pipe(takeUntil(this.destroy$),tap((res:any)=>{  console.log(res);
    // this.messageservice.userchat$.next([...this.messageservice.userchat,res])
  })).subscribe()

  console.log('direct message component ');


}
  ngOnInit(): void {

    // setTimeout(() => {
    //   console.log('we are messaging', this.ui.chatowner.value);

    // }, 3000);

  }

  ngAfterViewInit(){
    // console.log(this.thread);
    console.log(this.messagetosend.nativeElement.innerHTML);
    // this.thread.scrollToBottom(300)
  }
  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  closemessage(){
    this.ui.directmessagepanel.next(2);
    this.router.navigate(['messages']);


  }



  backtoprofile(){
    this.router.navigateByUrl(`profile/${this.ui.postowner.value._id}`);
  }

  sendmessage(){

    console.log(this.messagetosend.nativeElement.innerHTML);

    this.message=this.messagetosend.nativeElement.innerHTML

    // console.log(this.message);
    if(this.message.trim()=='') return alert('please input a chat message')

    this.io.sendmessage(this.message);
    this.message=this.messagetosend.nativeElement.innerHTML=''

  }
}
