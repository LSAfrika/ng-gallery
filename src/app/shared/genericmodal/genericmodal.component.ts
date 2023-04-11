import { takeUntil, catchError,tap } from 'rxjs/operators';
import { MessagesService } from './../../services/messages.service';
import { UiService } from 'src/app/services/ui.service';
import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-genericmodal',
  templateUrl: './genericmodal.component.html',
  styleUrls: ['./genericmodal.component.scss']
})
export class GenericmodalComponent implements OnInit {

  @Input()user:string
  @Input()chatid:string
  Destroy$=new Subject<boolean>()
  constructor(private ui:UiService,private msg:MessagesService) { }

  ngOnInit(): void {
  }
  ngOnDestroy(){
    this.Destroy$.next(true)
    this.Destroy$.complete()
  }

  closemodal(){
    this.ui.openmodal.next(false)
  }

  deletechat(){
    this.msg.deletechat(this.chatid)
    .pipe(
     takeUntil(this.Destroy$),
      tap(res=>
      {console.log('user chatlist value: ',this.msg.userchatlist$.value);
      //  const tempchatlist:any= this.msg.userchatlist$.value.userchats.splice(this.msg.indexdelete,1)
       console.log('behaviour subject value',this.msg.userchatlist$.value.userchats.splice(this.msg.indexdelete,1));

      // const newarray=tempchatlist.splice(this.msg.indexdelete,1)
      // console.log('spliced array',tempchatlist);

      // this.msg.userchatlist$.next(tempchatlist)

      this.closemodal()
    }
      )
    //   catchError(err=>{console.log('error from chat deletion: ',err.message)})
      )
      .subscribe()

  }
}
