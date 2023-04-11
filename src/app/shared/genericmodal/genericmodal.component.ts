import { MessagesService } from './../../services/messages.service';
import { UiService } from 'src/app/services/ui.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-genericmodal',
  templateUrl: './genericmodal.component.html',
  styleUrls: ['./genericmodal.component.scss']
})
export class GenericmodalComponent implements OnInit {

  @Input()user:string
  @Input()chatid:string
  constructor(private ui:UiService,private msg:MessagesService) { }

  ngOnInit(): void {
  }

  closemodal(){
    this.ui.openmodal.next(false)
  }

  deletechat(){
    this.msg.deletechat(this.chatid)
  }
}
