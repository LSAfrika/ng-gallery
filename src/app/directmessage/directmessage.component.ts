import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UiService } from '../services/ui.service';
import { IOService } from '../services/io.service';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-directmessage',
  templateUrl: './directmessage.component.html',
  styleUrls: ['./directmessage.component.scss']
})
export class DirectmessageComponent implements OnInit {

  numberOfLineBreaks=0
items=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
textareaheight=2
destroy$=new Subject<boolean>()
constructor(public ui:UiService,private router: Router,private io:IOService) { 

this.io.getNewMessage().pipe(takeUntil(this.destroy$),tap(res=>console.log(res))).subscribe()

}
  ngOnInit(): void {
    console.log('we are messaging',this.ui.postowner.value)

  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }

  closemessage(){
    this.ui.directmessagepanel.next(2)
    this.router.navigate(['messages'])


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

  backtoprofile(){
    this.router.navigateByUrl(`profile/${this.ui.postowner.value._id}`)
  }

  sendmessage(){
    this.io.sendmessage()
  }
}
