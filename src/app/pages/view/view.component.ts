import { UiService } from './../../services/ui.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Post,User } from 'src/app/interface/post.interface';
import { PostService } from 'src/app/services/Post.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  snapid = new BehaviorSubject<string>('');
  userobject: Post;
  post: Observable<Post>;
commentform: FormGroup;
destroy: Subject<boolean> = new Subject();
disablepictureclick=false
viewpic=0
picture=0
deleting=false
// postowner:User
modalmessage='deleting...'
modal=false
imagelength=0
liked = false;
iddeletioncomment=''
commentorpost=''
currentpost:Post
  constructor(private router:Router,
    private active: ActivatedRoute,
     private snapshares: PostService,
     private formbuilder: FormBuilder,public ui:UiService,
     private location: Location
     ) {
this.snapid.next( this.active.snapshot.params.id);






  this.post = this.snapid.pipe(switchMap(id =>  this.snapshares.getsinglepost(id)), map((res: any) =>
  {
    if(res.errormessage=='missing document')return this.router.navigateByUrl('/')
    // console.log(res)
    return res.singlepost}),tap(
    (result:any)=>{
       console.log('fetched snapshare',result);
      //  const currentcommentersuserids=result.comments.map((comment:any)=>{return comment.ownerid._id})
      //  console.log('all commenter on post: \n',currentcommentersuserids);

      //  console.log('uid included:',);


      // if(currentcommentersuserids.inculdes(this.ui.logedinuser._id))){
      //   console.log('currentn user has commented on snap share');

      // }
      this.ui.postowner.next(result.user),
      this.checkifliked(result),
      this.imagelength=result.imgurl.length,
      this.currentpost=result
    //  console.log('current post:',this.currentpost)

     if(this.ui.postowner.value._id == this.ui.logedinuser._id){

      this.snapshares.updatenotifications(this.active.snapshot.params.id).pipe(takeUntil(this.destroy)).subscribe(res=>console.log('response from notifications endpoint',res))
    }

    if(result.comments.map((comment:any)=>{return comment.ownerid._id}).includes(`${this.ui.logedinuser._id}`)==true){

      this.snapshares.updatebroadcastnotifications(this.active.snapshot.params.id).pipe(takeUntil(this.destroy)).subscribe(res=>console.log('response from notifications endpoint',res))
    }



    }
      ));



this.initializeform();


   }



  ngOnInit(): void {



  }
  ngOnDestroy(): void {

    this.destroy.next(true);
    this.destroy.complete()
    this.destroy.unsubscribe()
  }



  togglemodalcomment(id?){
    console.log(id);
this.commentorpost='comment'
    this.iddeletioncomment=id
    this.modal=!this.modal
  }



  viewpicture(){
   this.viewpic=1


  }
  closepicture(){

   this.viewpic=2

  }


deletecomment(){
  console.log(this.iddeletioncomment);

  this.deleting=true

  // return alert('comment to be deleted')

  this.snapshares.deletecomment(this.iddeletioncomment).pipe(takeUntil(this.destroy)).subscribe(res=>{
    console.log(res);
    this.modalmessage='deletion successful'
    this.snapid.next( this.active.snapshot.params.id);

    setTimeout(() => {

      this.deleting=false
      this.modal=false
      this.modalmessage='deleting...'
    }, 2000);
    },err=>{console.log(err.message);

      this.modalmessage='deletion error'

    setTimeout(() => {

      this.deleting=false
      this.modal=false
      this.modalmessage='deleting...'
    }, 2000);
  })
}

deletepost(){

  this.deleting=true

 this.snapshares.deletepost(this.snapid.value).pipe(takeUntil(this.destroy),switchMap((res:any)=>{
  // if(res.message=='post deleted') alert('post succesfully deleted')\\\\\\\/
 return this.snapshares.usersnapshares(this.ui.logedinuser._id)


}),map((res:any)=>{console.log('fetched profile posts:',res.posts),
this.snapshares.postownersnapshares.next(res.posts)})
).subscribe(()=>{
  this.modalmessage='deletion successful'

  setTimeout(() => {

    this.deleting=false
    this.modal=false
    this.modalmessage='deleting...'
this.back()

  }, 2000);

},err=>{
  console.log(err.message);
  alert(err.message)

})


}
closemodal(){
  this.modal=false
}

back() {
  this.location.back()
}

togglemodelpost(){
this.commentorpost='post'

  this.modal=!this.modal
}

  next(){

    if(this.picture=== this.imagelength-1) this.picture=-1
    this.picture++

  }
  previous(){
    if(this.picture=== 0) this.picture=this.imagelength
    this.picture--
  }

  disablepicture(bool:boolean):Boolean{

    return this.disablepictureclick= bool
  }
  initializeform(){
    this.commentform = this.formbuilder.group({

      comment: ['', [Validators.required]]

    });
  }

 get _comment(){
    return this.commentform.get('comment');
  }


  postcomment(id){

    console.log(this.commentform.hasError);
    if (this.commentform.invalid) { return alert('please add a comment') }
    console.log(id);
    console.log(this.commentform.value);

    this.snapshares.postcomment(id, this.commentform.value).pipe(takeUntil(this.destroy)).subscribe(res => {
      console.log(res);
      this.initializeform();
      this.snapid.next(this.active.snapshot.params.id);

    }, err => {
      console.log(err.error);

    });



  }


  checkifliked(post?): Boolean{
    const token = localStorage.getItem('auth').split('.')[1];

    const userstring = atob(token);
    const user=JSON.parse(userstring)
    // console.log(user);
    // console.log(post.likes);

    const id = post.likes.find(userlike => {  return userlike._id === user._id;});
// console.log(id);

if(id===undefined)return this.liked= false

this.liked=  true;
  }

  like(id){

    this.liked = !this.liked;
    this.snapshares.likepost(id).pipe(takeUntil(this.destroy)).subscribe(res => {
      console.log(res);
      this.snapid.next(this.active.snapshot.params.id);
    }, err => {

    }


    );
   }


}
