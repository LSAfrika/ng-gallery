import { UiService } from './../../services/ui.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/Post.service';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
  constructor(private activeroute:ActivatedRoute,public ui:UiService,private snapshare:PostService,private router:Router) {

    this. userid=this.activeroute.snapshot.params.id
    console.log(this.userid);

    console.log('profile user',this.ui.postowner.value);

// if(this.ui.postowner.value!==undefined) return

     if(this.snapshare.postownersnapshares.value==undefined) {
      this.snapshare.user(this.userid).
      pipe(
      map((response:any)=>{
        console.log('profile:\n',response.user);

        this.ui.postowner.next(response.user);
        console.log(this.ui.postowner.value);

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
    this.destroy$.next(true)
  }

  checkfollowinguser(){
    this.snapshare.checkiffollowinguser(this.userid).pipe(takeUntil(this.destroy$),
    map((res:any)=>{this.following=res.following;this.ui.postowner.next(res.user); console.log('initial check',res);this.initialcheckfollowing()})).subscribe()

  }

  fetchuserfollowers(){
    this.snapshare.fetchfollowers(this.userid).pipe(takeUntil(this.destroy$),
    map((res:any)=>{
      // console.log(res.splicedfollowers);

      if(res.splicedfollowers.length<10)this.ui.disablefetchfollowers=true

      this.snapshare.userfollowers.next([...this.snapshare.userfollowers.value,...res.splicedfollowers])})).subscribe()
  }

  fetchuserfollowing(){
    this.snapshare.fetchfollowing(this.userid).pipe(takeUntil(this.destroy$),
    map((res:any)=>{
      // console.log(res.splicedfollowers);

      if(res.splicedfollowing.length<10)this.ui.disablefetchfollowing=true
      this.snapshare.userfollowing.next([...this.snapshare.userfollowing.value,...res.splicedfollowing])})).subscribe()
  }

  fetchnextset(){
    this.snapshare.userpostpagination++
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

    this.ui.directmessagepanel.next(3)

    this.router.navigate(['messages'],{ queryParams: { user: `${this.ui.postowner.value._id}` } })
    console.log(this.ui.directmessagepanel.value)


}


}
