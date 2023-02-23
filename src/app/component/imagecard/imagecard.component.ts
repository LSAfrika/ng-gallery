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
  constructor() { }

  ngOnInit(): void {

     console.log(this.post.category);

  }

}
