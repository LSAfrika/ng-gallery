import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Post } from 'src/app/interface/post.interface';
import { PostService } from 'src/app/service/Post.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  snapid=new BehaviorSubject<string>('')
  post:Observable<Post>

  constructor(private active:ActivatedRoute,private snapshares:PostService) {
this.snapid.next( this.active.snapshot.params.id)

this.post= this.snapid.pipe(switchMap(id=>  this.snapshares.getsinglepost(id)),map((res:any)=> res.singlepost))




   }

  ngOnInit(): void {

    this.post.subscribe(console.log)
  }

}
