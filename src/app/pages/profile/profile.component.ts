import { UiService } from './../../services/ui.service';
import { ActivatedRoute } from '@angular/router';
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
  destroy$=new Subject<boolean>()
  disablebutton=false
  constructor(private activeroute:ActivatedRoute,public ui:UiService,private snapshare:PostService) {

    this. userid=this.activeroute.snapshot.params.id
    console.log(this.userid);

     if(this.snapshare.postownersnapshares.value==undefined) {
      this.snapshare.user(this.userid).
      pipe(
      map((response:any)=>{
        this.ui.postowner.next(response.user);
        this.ui.postcounter.next(response.totaluserposts);
        return this.userid
      }),
      switchMap(id=> {console.log(id);
       return this.snapshare.usersnapshares(id)}),
      map((res:any)=>{console.log(res.posts),
        this.snapshare.postownersnapshares.next(res.posts)}),
      takeUntil(this.destroy$)).subscribe()
      }

  }

  ngOnInit(): void {
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
  ngOnDestroy(){

    // this.snapshare.pagination=0
    this.destroy$.next(true)
  }

}
