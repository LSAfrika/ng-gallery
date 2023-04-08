import { UiService } from './../../services/ui.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friendlist',
  templateUrl: './friendlist.component.html',
  styleUrls: ['./friendlist.component.scss']
})
export class FriendlistComponent implements OnInit {

  // public ui:UiService=inject(UiService)
  constructor(public ui:UiService,private router:Router) { }

  ngOnInit(): void {

    console.log('friend list to be displayed',this.ui.userlist$.value);

  }

  closelist(){
    this.ui.openmessagelist=2

    setTimeout(() => {
      this.ui.openmessagelist=0
    }, 500);
  }

  directmessage(id){

this. closelist()
    this.router.navigateByUrl(`/directmessage/${id}`)
  }


}
