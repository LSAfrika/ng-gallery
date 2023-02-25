import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(public ui:UiService,private router:Router) { }

  route=''
  routarray
  title=''
  ngOnInit(): void {

    this.route=this.router.url.split('/')[1]
    console.log(this.router.url.split('/'));
    console.log('current route: ',this.route);
if(this.route===''||this.route==='view') this.title='snapshare'
if(this.route==='profile') this.title='profile'
if(this.route===' messages') this.title='messages'


  }

  profile(){
    this.router.navigate(['profile'])
  }

  messages(){
    this.router.navigate(['messages'])
  }

  home(){
    this.router.navigate([''])
  }

}
