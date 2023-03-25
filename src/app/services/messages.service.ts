import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messagepagination=-1


  userchatlist$=new BehaviorSubject<[]>([])

  userchat$=new BehaviorSubject<any>([])

  ROOTMESSAGEURL='http://localhost:4555/messages/'
  constructor(private http:HttpClient) { }




  fetchchat(user:string){

    return this.http.get(this.ROOTMESSAGEURL+'getusermessage/'+`${user}/`+'?pagination='+this.messagepagination)
  }


  fetchchatlist(){
    return this.http.get(this.ROOTMESSAGEURL+"getuserchats/")
  }

  fetchspecificusermessagelist(){

  }


}
