import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messagepagination=-1

chatid=''
  userchatlist$=new BehaviorSubject<any>([])
unreadcounter=0
  userchat$=new BehaviorSubject<any>([])
  indexdelete=0

  ROOTMESSAGEURL=environment.API+'messages/'

  constructor(private http:HttpClient) { }




  fetchchat(user:string){

    return this.http.get(this.ROOTMESSAGEURL+'getusermessage/'+`${user}/`+'?pagination='+this.messagepagination)
  }


  fetchchatlist(){
    return this.http.get(this.ROOTMESSAGEURL+"getuserchats/")
  }

  fetchsunreadmessages(){
return this.http.get(this.ROOTMESSAGEURL+'unreadmessagescounter/')
  }

  deletechat(chatid){

    console.log('chat id to delete ',chatid);
    return this.http.delete(this.ROOTMESSAGEURL+`deletemessage/${chatid}`)

  }

  resetunreadcounter(chatid){
 return this.http.patch(this.ROOTMESSAGEURL+'resetcounter/'+`${chatid}`,{})
}

}
