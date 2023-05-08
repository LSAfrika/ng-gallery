import { UiService } from './../../services/ui.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/Post.service';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { IOService } from 'src/app/services/io.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userid=''
  following=false
  follow='follow'
  destroy$=new Subject<boolean>()
  disablebutton=false
  constructor(private activeroute:ActivatedRoute,public ui:UiService,private snapshare:PostService,private router:Router,private io:IOService) {


    this. userid=this.activeroute.snapshot.params.id
    console.log(this.userid);

    console.log('profile user',this.ui.postowner.value);

// if(this.ui.postowner.value!==undefined) return

     if(this.snapshare.postownersnapshares.value==undefined) {
      this.snapshare.user(this.userid).
      pipe(
      map((response:any)=>{
        // console.log('profile:\n',response.user);

        this.ui.postowner.next(response.user);
        // console.log(this.ui.postowner.value);

        this.ui.postcounter.next(response.postcount);
        return this.userid
      }),
      switchMap(id=> {console.log(id);
       return this.snapshare.usersnapshares(id)}),
      map((res:any)=>{console.log(res.posts),
        this.snapshare.postownersnapshares.next(res.posts)}),
      takeUntil(this.destroy$)).subscribe()
      console.log('profile user after fetch',this.ui.postowner.value);
      }

this.fetchuserfollowers()
this.fetchuserfollowing()
this.checkfollowinguser()
  }




  ngOnInit(): void {
  }
  ngOnDestroy(){

    // this.snapshare.userfollowers.next([])\\\\\\\\\\\\\
    // this.snapshare.userfollowing.next([])
    this.snapshare. paginationfollowers=0
    this.snapshare.paginationfollowing=0
    this.destroy$.next(true)

  }

  checkfollowinguser(){
    this.snapshare.checkiffollowinguser(this.userid).pipe(takeUntil(this.destroy$),
    map((res:any)=>{this.following=res.following;this.ui.postowner.next(res.user); console.log('initial check',res);this.initialcheckfollowing()})).subscribe()

  }

  fetchuserfollowers(){
    this.snapshare.fetchfollowers(this.userid).pipe(takeUntil(this.destroy$),
    map((res:any)=>{
       console.log('fetched user followers',res);

      if(res.splicedfollowers.length<10)this.ui.disablefetchfollowers=true

      this.snapshare.userfollowers.next([...this.snapshare.userfollowers.value,...res.splicedfollowers])})).subscribe()
  }


  directmessageuser(id){
    this.router.navigateByUrl(`directmessage/${id}`)
  }
  visituserprofile(id){
    this.router.navigate(['/profile',id])


    this.snapshare.userfollowers= new BehaviorSubject([])
    this.snapshare.userfollowing= new BehaviorSubject([])
    this.snapshare.paginationfollowers=-1
    this.snapshare.paginationfollowing=-1
    this.snapshare.userpostpagination=0
    this.snapshare.postownersnapshares= new BehaviorSubject([])
    this.disablebutton=false
    console.log('post of user: ',this.snapshare.postownersnapshares.value);
    this.userid=id

    this.snapshare.user(id).pipe(tap((res:any)=>{
      console.log('res after fetching new user',res)
     this.ui.postowner.next(res.user)
     this.ui.postcounter.next(res.postcount);
this.ui.profileview=1

     console.log('values of following and folowers: ',this.snapshare.userfollowers.value,this.snapshare.userfollowing.value);

    }

    ),takeUntil(this.destroy$)).subscribe()

    this.snapshare.usersnapshares(id).pipe(takeUntil(this.destroy$),
      map((res:any)=>{console.log('fetched profile posts:',res.posts),
        this.snapshare.postownersnapshares.next(res.posts)})).subscribe()
    // console.log('post owner obj',this.snapshare.postownersnapshares.value);
    this.fetchuserfollowers()
    this.fetchuserfollowing()


  }
  fetchuserfollowing(){
    this.snapshare.fetchfollowing(this.userid).pipe(takeUntil(this.destroy$),
    map((res:any)=>{
      // console.log(res.splicedfollowers);
      console.log('fetched user following',res);


      if(res.splicedfollowing.length<10)this.ui.disablefetchfollowing=true
      this.snapshare.userfollowing.next([...this.snapshare.userfollowing.value,...res.splicedfollowing])})).subscribe()
  }

  fetchnextset(){
    this.snapshare.userpostpagination++

    console.log('next set of posts if',this.userid);

    this.snapshare.usersnapshares(this.userid).pipe(
      map((res:any)=>{
      if(res.posts<5) this.disablebutton=true

      this.snapshare.postownersnapshares.next([...this.snapshare.postownersnapshares.value,...res.posts])}),
      takeUntil(this.destroy$)
    ).subscribe()
  }


  followuser(){

    // console.log('follow set is clicked');


  this.snapshare.follow(this. userid).pipe(takeUntil(this.destroy$),
  map(res=>{this.following=res.following;this.ui.postowner.next(res.user);this.initialcheckfollowing();console.log('server following response',res);
  })).subscribe()


  }

initialcheckfollowing(){
  // console.log('check if following',this.following);
  if(this.following==true) this.follow='following'
  if(this.following==false)  this.follow='follow';
}


textuser(){

    // this.ui.directmessagepanel.next(3)

    this.router.navigate(['directmessage'+`/${this.ui.postowner.value._id}`])
    console.log(this.ui.directmessagepanel.value)


}


}
