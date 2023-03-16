import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messagepagination=-1

  ROOTMESSAGEURL='http://localhost:4555/messages/getusermessage/'
  constructor(private http:HttpClient) { }




  fetchchat(user:string){

    return this.http.get(this.ROOTMESSAGEURL+`${user}/`+'?pagination='+this.messagepagination)
  }



}
