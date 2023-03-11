import { Component, OnInit } from '@angular/core';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-directmessage',
  templateUrl: './directmessage.component.html',
  styleUrls: ['./directmessage.component.scss']
})
export class DirectmessageComponent implements OnInit {

  numberOfLineBreaks=0
items=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  constructor(public ui:UiService) { }
textareaheight=2
  ngOnInit(): void {
  }

  closemessage(){
    this.ui.directmessagepanel.next(2)

    console.log(this.ui.directmessagepanel.value)
  }

  enterpressed(ev){
    // console.log(ev);
    let value =ev.key
    let length=ev.target.value.split('\r')
    console.log(length);

    //  console.log(value);
  if(value=='Enter'){


    if(this.textareaheight>=3)return
    this.textareaheight++
  }

    // console.log(enter);

//   let  enteredTextEncoded = encodeURI(value);
// let linebreaks = enteredTextEncoded.match(/%0A/g);
//  if(linebreaks==null) console.log(linebreaks);

// (linebreaks != null) ? this.numberOfLineBreaks = linebreaks.length : this.numberOfLineBreaks = 0;


    // console.log(ev.key);

  }
}
