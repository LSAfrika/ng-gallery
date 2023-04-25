import { IOService } from 'src/app/services/io.service';
import { AuthService } from './../../services/auth.service';
import { PostService } from './../../services/Post.service';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject, Observable, combineLatest } from 'rxjs';
import { MessagesService } from './../../services/messages.service';
import { UiService } from 'src/app/services/ui.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  Destroy$=new Subject<boolean>()
  currentdate=Date.now()
  fulldayinmilliseconds=86400000
   following$:Observable<any>
   followers$:Observable<any>

   donotnavigate=false
    user: any;
    chatid:any
  constructor(public ui:UiService,
    public msgservice:MessagesService,
    private router:Router,
    private snapshare:PostService,
    public io:IOService,
    private auth:AuthService) {


// console.log('current logged in user ', this.ui.logedinuser);
console.log('user messaging list before', this.ui.userlist$.value);


this.msgservice.fetchchatlist().pipe(takeUntil(this.Destroy$),
tap((res:any)=>{

  console.log('user chat list',res);
  if(res===null) return
   res.userchats.reverse()



  msgservice.userchatlist$.next(res)
}

  )).subscribe()


   this.followers$=  this.snapshare.fetchfollowers(this.ui.logedinuser._id)
   this.following$=  this.snapshare.fetchfollowing(this.ui.logedinuser._id)
// console.log('user list to message',this.ui.userlist$.value);

  //todo  CHANGE TO SWITCHMAP
   combineLatest([this.followers$,this.following$]).pipe(takeUntil(this.Destroy$),tap((users:any)=>{

    const singularobject={...users[0],...users[1]}
const combinedarray=[...singularobject.splicedfollowers,...singularobject.splicedfollowing]
const filteredusers= this.getUnique(combinedarray,'_id')
// console.log('combine latest array filtered: ',filteredusers)
//todo  rember pagination logic it increaces pagination nuber
     this.ui.userlist$.next([...this.ui.userlist$.value,...filteredusers])
console.log('user list to message after fetch',this.ui.userlist$.value);

   }


   )).subscribe();


  }


  getUnique(arr, comp) {

    // store the comparison  values in array
const unique =  arr.map(e => e[comp])

  // store the indexes of the unique objects
  .map((e, i, final) => final.indexOf(e) === i && i)

  // eliminate the false indexes & return unique objects
 .filter((e) => arr[e]).map(e => arr[e]);

return unique;
}

  ngOnInit(): void {
    console.log('messages component');

this.io.NewMessageNotification().pipe(takeUntil(this.Destroy$)).subscribe(Notification=>{
  console.log('message notfication',Notification)
  // this.msgservice.userchatlist$.next(undefined)
  this.msgservice.userchatlist$.next(Notification)

});

  }

  ngOnDestroy(){

    this.Destroy$.next(true)
    this.Destroy$.complete()

  }
  deletemodal(username,chatid,index){

    this.msgservice.indexdelete=index
    this.user=username
    this.chatid=chatid
    this.ui.openmodal.next(true)
    console.log('modal opened',this.user);

  }
  disablenavigation(){
    this.donotnavigate=true

  }
  enablenavigation(){
    this.donotnavigate=false

  }

  openuserlist(){
    this.ui.openmessagelist=1
  }



  openmessage(){
    this.ui.directmessagepanel.next(1)
    console.log(this.ui.directmessagepanel.value)

  }



  textuser(id){

    if(this.donotnavigate==true)return
    // this.ui.directmessagepanel.next(3)

    this.router.navigate(['directmessage'+`/${id}`])
    console.log(this.ui.directmessagepanel.value)


}


}
