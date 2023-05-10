import { Post } from '../../interface/post.interface';
import { UiService } from 'src/app/services/ui.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-imagecard',
  templateUrl: './imagecard.component.html',
  styleUrls: ['./imagecard.component.scss']
})
export class ImagecardComponent implements OnInit {


  @Input()post:Post

  backgroundimage=''
  disableanchor=false
  diableprofilelink=false
  constructor(private ui:UiService,private router:Router) {

    console.log();

    if(this.router.url.split('/')[1]=='profile') this.diableprofilelink=true
    if(this.router.url.split('/')[1]!=='profile') this.diableprofilelink=false


   }


   ngAfterViewInit(){


  }
  ngOnInit(): void {
    this.backgroundimage=`background-image:url(${this.post.imgurl[0]}); background-size: cover;background-repeat: no-repeat;`

    // console.log(this.post.category);


  }

  setuser(user){
    this.ui.postowner.next(user)

    console.log('current user',user);

    this.router.navigateByUrl(`snapshare/${this.post._id}`)




  }


  navigatetoprofile(userid){

    console.log('user to view ',userid);

    this.ui.postowner.next(userid)

    // console.log('current user id',userid);

    this.router.navigate([`profile/${userid._id}`])

  }

  disableanchortag(){
    this.disableanchor=true
    // console.log('tag value',this.disableanchor);

  }
  enableanchortag(){
    this.disableanchor=false
    // console.log('tag value',this.disableanchor);

  }

}
