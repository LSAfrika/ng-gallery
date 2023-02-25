import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { Post } from 'src/app/interface/post.interface';
import { PostService } from 'src/app/services/Post.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  snapid=new BehaviorSubject<string>('')
  post:Observable<Post>
commentform:FormGroup
destroy:Subject<boolean>= new Subject()
  constructor(private active:ActivatedRoute,private snapshares:PostService,private formbuilder:FormBuilder) {
this.snapid.next( this.active.snapshot.params.id)

this.post= this.snapid.pipe(switchMap(id=>  this.snapshares.getsinglepost(id)),map((res:any)=> res.singlepost))

this.initializeform()


   }

  ngOnInit(): void {

    this.post.subscribe(console.log )
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy.next(true)
  }

  initializeform(){
    this.commentform= this.formbuilder.group({

      comment:['',[Validators.required]]

    })
  }

 get _comment(){
    return this.commentform.get('comment')
  }


  postcomment(id){

    console.log(this.commentform.hasError)
    if(this.commentform.invalid) return alert('please add a comment')
    console.log(id);
    console.log(this.commentform.value);

    this.snapshares.postcomment(id,this.commentform.value).pipe(takeUntil(this.destroy)).subscribe(res=>{
      console.log(res);
      this.initializeform()
      this.snapid.next(this.active.snapshot.params.id)
      
    },err=>{ 
      console.log(err.message);
      
    })
    
    

  }



}
