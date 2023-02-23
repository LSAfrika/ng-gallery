import { UiService } from 'src/app/services/ui.service';
import { PostService } from 'src/app/service/Post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(public postservice:PostService,public ui:UiService) { }

  selected=1
  ngOnInit(): void {
  }

  allposts(category){
    this.selected=category
    this.postservice.resetcategorypost()
    this.ui.categoriesinactive()
  }

  choosecategory(category:number){
    this.selected=category
    let categ=''
    if(this.selected===1)categ='all'
    if(this.selected===2)categ='nature'
    if(this.selected===3)categ='wildlife'
    if(this.selected===4)categ='foods'
    if(this.selected===5)categ='sports'
    if(this.selected===6)categ='landscapes'
    this.ui.categoriesactive()
    this.postservice.getcategorypost(categ);

  }

}
