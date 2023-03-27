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

  // @ViewChild('chatview') thread: ElementRef;
  @ViewChild('messendtosend') messagetosend: any;


  // destroy$=new Subject<boolean>()
  numberOfLineBreaks = 0;
items = [1, 1, 1, 1, 1];

textareaheight = 2;
userid = '';
message = '';
destroy$ = new Subject<boolean>();
@ViewChild('chatview') private myScrollContainer: ElementRef;


constructor(public ui: UiService, private router: Router,
            private io: IOService, private route: ActivatedRoute,
            private postservice: PostService,
            public messageservice: MessagesService
    ) {

  this.userid = this.route.snapshot.params.userid;
  console.log('current user', this.userid);

  console.log('chat owner ',this.ui.chatowner.value );

  if (this.ui.chatowner.value === undefined) { this.fetchchatmessagesinitial(); }


  if (this.ui.chatowner.value != undefined && this.ui.chatowner.value._id !== this.userid) { this.chatownerchangefetchmessages(); }

 this.io.getNewMessage().pipe(takeUntil(this.destroy$),
 tap(res=>{console.log(res);
 this.messageservice.userchat$.next([...this.messageservice.userchat$.value,res])

}))
 .subscribe()




  this.io.offlinenewmessage().pipe(takeUntil(this.destroy$), tap((res: any) => {
    console.log('offline response:',res);
    if(res===undefined) return
    if (this.messageservice.userchat$.value.length>0&&this.messageservice.userchat$.value[this.messageservice.userchat$.value.length - 1].message === res.message){ return}
    const newmessagesareray: any = [...this.messageservice.userchat$.value, res];
    console.log('messages array:', newmessagesareray);

    this.messageservice.userchat$.next(newmessagesareray);
  })).subscribe();

  console.log('direct message component ');


}
  ngOnInit(): void {



  }

  ngAfterViewInit(){
    // console.log(this.thread);
    // console.log(this.messagetosend.nativeElement.innerHTML);
    // this.thread.scrollToBottom(300)
  }
  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  ngAfterViewChecked() {
    this.scrollToBottom();
}
  chatownerchangefetchmessages(){
    this.postservice.user(this.userid)
        .pipe(takeUntil(this.destroy$),
        map((res: any) => {this.ui.chatowner.next(res.user); return res.user._id;}),
        switchMap((userid: any) => this.messageservice.fetchchat(userid)),
        tap((chat: any) => {this.messageservice.userchat$.next(chat.chat); console.log('fetched user chat', this.messageservice.userchat$.value);})

        ).subscribe();

  }

  fetchchatmessagesinitial(){
    this.postservice.user(this.userid)
    .pipe(
      takeUntil(this.destroy$),
      map((res: any) => {console.log('chating with: ',res);this.ui.chatowner.next(res.user); return res.user._id;}),
      switchMap((userid: any) => this.messageservice.fetchchat(userid)),
      tap((chat: any) => {this.messageservice.userchat$.next(chat.chat.reverse()); console.log('fetched user chat', this.messageservice.userchat$.value);
      })).
      subscribe();
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

    this.message = this.messagetosend.nativeElement.innerHTML;

    // console.log(this.message);
    if (this.message.trim() == '') { return alert('please input a chat message') }

    this.io.sendmessage(this.message);
    this.message = this.messagetosend.nativeElement.innerHTML = '';
    this.scrollToBottom();
  }



  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.log(err.message);

     }
}
}
