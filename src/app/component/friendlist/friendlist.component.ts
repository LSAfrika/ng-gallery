import { map, switchMap } from 'rxjs/operators';
import { PostService } from 'src/app/services/Post.service';
import { UiService } from './../../services/ui.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friendlist',
  templateUrl: './friendlist.component.html',
  styleUrls: ['./friendlist.component.scss']
})
export class FriendlistComponent implements OnInit {

  // public ui:UiService=inject(UiService)
  combined=[]
  followers$=  this.snapshare.fetchfollowers(this.ui.logedinuser._id)
  following$=  this.snapshare.fetchfollowing(this.ui.logedinuser._id)


  // friendlist$=


  constructor(public ui:UiService,private router:Router,private snapshare:PostService) {


      console.log('follower/ing value', this.snapshare.paginationfollowing, this.snapshare.paginationfollowers);

this.fetchfriends()

   }

  ngOnInit(): void {

    console.log('friend list to be displayed',this.ui.userlist$.value);

  }

  fetchfriends(){

    if(this.snapshare.paginationfollowers>0||this.snapshare.paginationfollowing>0)return
    this.followers$.pipe(
      switchMap((followers:any)=>{
      //  this.ui.userlist$.next([...followers])
      console.log('current followers',followers.splicedfollowers);

      this.combined=[...followers.splicedfollowers]
       return this.following$


      }),
      map((following:any)=>{
      console.log('current followers',following.splicedfollowing);

        this.combined=[...this.combined,...following.splicedfollowing]
  const filteredusers= this.getUnique(this.combined,'_id')


  this.ui.userlist$.next([...this.ui.userlist$.value,...filteredusers])
  console.log('retuned friends: ',this.ui.userlist$.value)

      })

    ).subscribe()

  }

  closelist(){
    this.ui.openmessagelist=2

    setTimeout(() => {
      this.ui.openmessagelist=0
    }, 500);
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

  directmessage(id){

this. closelist()
    this.router.navigateByUrl(`/directmessage/${id}`)
  }


}
