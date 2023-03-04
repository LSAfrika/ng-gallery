import { Post } from '../../interface/post.interface';
import { UiService } from 'src/app/services/ui.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-imagecard',
  templateUrl: './imagecard.component.html',
  styleUrls: ['./imagecard.component.scss']
})
export class ImagecardComponent implements OnInit {


  @Input()post:Post

  backgroundimage=''
  constructor(private ui:UiService) {


   }


   ngAfterViewInit(){


  }
  ngOnInit(): void {
    this.backgroundimage=`background-image:url(${this.post.imgurl[0]}); background-size: cover;background-repeat: no-repeat;`

    // console.log(this.post.category);


  }

  setuser(user){
    this.ui.postowner=user

  }

}
