import { UiService } from 'src/app/services/ui.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(private ui:UiService) { }

  ngOnInit(): void {
  }

  openmessage(){
    this.ui.directmessagepanel.next(1)
    console.log(this.ui.directmessagepanel.value)

  }

}
