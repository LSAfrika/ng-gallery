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

  visible=false

  constructor(public postservice: PostService,public ui:UiService) {

    // if(this.postservice.allposts.length>0)this.postservice.allposts=[];this.postservice.fetchnextsnapshares.next(0)
   }

  ngOnInit(): void {

    // this.postservice.getpost()
  //  this.postservice.snapshares.subscribe(console.log)

  // console.log(this.postservice.fetchnextsnapshares.value);
  setTimeout(() => {
    this.visible=true
  }, 1000);

  }




  fetchnext(){
    if(this.postservice.category=='') this.postservice.fetchnextsetofposts()
    if(this.postservice.category!='')this.postservice.getcategorypostnext()

    // this.postservice.getpost()
  }



}
