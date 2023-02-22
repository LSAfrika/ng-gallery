import { map } from 'rxjs/operators';
import { Post } from './../../interface/post.interface';
import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/service/Post.service';

@Component({
  selector: 'app-imagescontainer',
  templateUrl: './imagescontainer.component.html',
  styleUrls: ['./imagescontainer.component.scss']
})
export class ImagescontainerComponent implements OnInit {

  constructor(public postservice: PostService) { }

  snapshares: BehaviorSubject<Post[]> = new  BehaviorSubject<Post[]>([]);
allposts: Post[] = [];
  ngOnInit(): void {

    this.postservice.getpost().
     pipe(map((posts) => { this.allposts = [...posts.allposts,...this.allposts ] ;
                         this.snapshares.next(this.allposts);
    }))
    .subscribe();

  // this.snapshares.subscribe(console.log)
  }


  fetchnext(){
    this.postservice.pagination++;

    this.postservice.getpost().pipe(map((posts) => { this.allposts = [...posts.allposts,...this.allposts ] ;
                                                   this.snapshares.next(this.allposts);
   })



    ).subscribe();
    // this.snapshares.subscribe(console.log)


  }

}
