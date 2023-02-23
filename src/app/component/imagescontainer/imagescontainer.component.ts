import { UiService } from 'src/app/services/ui.service';
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

  constructor(public postservice: PostService,public ui:UiService) { }

  ngOnInit(): void {

    this.postservice.getpost()
  // this.snapshares.subscribe(console.log)
  }


  fetchnext(){
    this.postservice.pagination++;

    this.postservice.getpost()
  }

  fetchnextcategory(){
    this.postservice.getcategorypostnext()
  }

}
