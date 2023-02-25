import { UiService } from './../../services/ui.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { Post,User } from 'src/app/interface/post.interface';
import { PostService } from 'src/app/services/Post.service';

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
// postowner:User

liked = false;
  constructor(private active: ActivatedRoute, private snapshares: PostService, private formbuilder: FormBuilder,private ui:UiService) {
this.snapid.next( this.active.snapshot.params.id);

this.post = this.snapid.pipe(switchMap(id =>  this.snapshares.getsinglepost(id)), map((res: any) => res.singlepost));

this.initializeform();
this.post.pipe(takeUntil(this.destroy)).subscribe(res => {

  this.ui.postowner=res.user
  // this.postowner=res.user
  console.log(this.ui.postowner);

  this.checkifliked(res);
});

   }



  ngOnInit(): void {


  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.destroy.next(true);
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
