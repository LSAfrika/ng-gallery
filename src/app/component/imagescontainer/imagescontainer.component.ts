import { UiService } from 'src/app/services/ui.service';
import { map } from 'rxjs/operators';
import { Post } from './../../interface/post.interface';
import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/Post.service';

@Component({
  selector: 'app-imagescontainer',
  templateUrl: './imagescontainer.component.html',
  styleUrls: ['./imagescontainer.component.scss']
})
export class ImagescontainerComponent implements OnInit {

  constructor(public postservice: PostService,public ui:UiService) {

    if(this.postservice.allposts.length>0)this.postservice.allposts=[];this.postservice.fetchnextsnapshares.next(0)
   }

  ngOnInit(): void {

    // this.postservice.getpost()
  // this.snapshares.subscribe(console.log)

  console.log(this.postservice.fetchnextsnapshares.value);

  }


  fetchnext(){
    this.postservice.fetchnextsnapshares.next( this.postservice.fetchnextsnapshares.value+1);

    // this.postservice.getpost()
  }

  fetchnextcategory(){
    this.postservice.getcategorypostnext()
  }

}
