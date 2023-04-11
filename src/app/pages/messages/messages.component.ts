import { AuthService } from './../../services/auth.service';
import { PostService } from './../../services/Post.service';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject, Observable, combineLatest } from 'rxjs';
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
  currentdate=Date.now()
  fulldayinmilliseconds=86400000
   following$:Observable<any>
   followers$:Observable<any>
  constructor(public ui:UiService,
    public msgservice:MessagesService,
    private router:Router,
    private snapshare:PostService,
    private auth:AuthService) {


// console.log('current logged in user ', this.ui.logedinuser);
console.log('user messaging list before', this.ui.userlist$.value);


msgservice.fetchchatlist().pipe(takeUntil(this.Destroy$),
tap((res:any)=>{

  console.log('user chat list',res);
  if(res===null) return
   res.userchats.reverse()
  // console.log('user conversations',res.userchats.reverse());

  // console.log('timestamp on message',res.userchats[0].timestamp+this.fulldayinmilliseconds);
  // console.log('current time',this.currentdate);


  msgservice.userchatlist$.next(res)}

  )).subscribe()


   this.followers$=  this.snapshare.fetchfollowers(this.ui.logedinuser._id)
   this.following$=  this.snapshare.fetchfollowing(this.ui.logedinuser._id)
console.log('user list to message',this.ui.userlist$.value);

  //  if(this.ui.userlist$.value.length==0) return
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
  }

  ngOnDestroy(){

    this.Destroy$.next(true)
    this.Destroy$.complete()

  }

  openuserlist(){
    this.ui.openmessagelist=1
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

// fetchuserfollowing(){
//   this.snapshare.fetchfollowing(this.userid)

//   .pipe(takeUntil(this.destroy$),
//   map((res:any)=>{
//     // console.log(res.splicedfollowers);
//     console.log('fetched user following',res);


//     if(res.splicedfollowing.length<10)this.ui.disablefetchfollowing=true
//     this.snapshare.userfollowing.next([...this.snapshare.userfollowing.value,...res.splicedfollowing])})).subscribe()
// }

// fetchuserfollowers(){
//   this.snapshare.fetchfollowers(this.userid).pipe(takeUntil(this.destroy$),
//   map((res:any)=>{
//      console.log('fetched user followers',res);

//     if(res.splicedfollowers.length<10)this.ui.disablefetchfollowers=true

//     this.snapshare.userfollowers.next([...this.snapshare.userfollowers.value,...res.splicedfollowers])})).subscribe()
// }

// fetchnextset(){
//   this.snapshare.userpostpagination++

//   console.log('next set of posts if',this.userid);

//   this.snapshare.usersnapshares(this.userid).pipe(
//     map((res:any)=>{
//     if(res.posts<5) this.disablebutton=true

//     this.snapshare.postownersnapshares.next([...this.snapshare.postownersnapshares.value,...res.posts])}),
//     takeUntil(this.destroy$)
//   ).subscribe()
// }



}
