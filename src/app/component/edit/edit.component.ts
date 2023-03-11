import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { PostService } from 'src/app/services/Post.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {


  username='hello'

  filename='choose file'
  uploaddata:FormData
  destroy$=new Subject<boolean>()
  constructor(public ui:UiService ,private snapshareservice:PostService) {

    console.log('edit user',this.ui.logedinuser);
    
    this.username=this.ui.logedinuser.username

   }

  ngOnInit(): void {
    this.uploaddata = new FormData()

  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true)
  }

  attachfile(event){
    const file = event.target.files[0]
    console.log(file);
    this.filename=file.name
    this.uploaddata.append('profilepic',file)
    // console.log(this.uploaddata.get('profile'));
    
  }

  updateprofile(){
    this.uploaddata.append('username',this.username)
this.snapshareservice.updateuser(this.uploaddata).pipe(takeUntil(this.destroy$),
map((res:any)=>{
localStorage.setItem('auth',res.token),
localStorage.setItem('refresh',res.token),
this.ui.user()
this.ui.updateuserprofile()
this.ui.editprofileui.next(false)
alert('profile updated')
})).subscribe()

  }

}
