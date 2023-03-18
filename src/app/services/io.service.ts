import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from "socket.io-client";
import { Message } from '../interface/messages.interface';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class IOService {


  snapsharebackend='http://localhost:4555'
  socket=io(this.snapsharebackend)
  public message$: BehaviorSubject<Message> = new BehaviorSubject(undefined);
socketsetup=false

  // socket=io(this.snapsharebackend)
  constructor(private ui:UiService) { 
    // console.log('socket',this.socket)
// this.setuid()

  }


  setuid(){


    // console.log('current logged in user',this.ui.logedinuser)
    return this.socket.emit('userconnect',{  uid:this.ui.logedinuser._id})
   }

   sendmessage(){
    console.log('user to send message',this.ui.logedinuser);
    console.log('user to receive message',this.ui.logedinuser);
    
   const messagepayload={
     from:this.ui.logedinuser._id,
     to:this.ui.postowner.value._id,
     chatuid:this.ui.logedinuser._id+":"+this.ui.postowner.value._id,
     viewed:false,
      message:`hello there ${this.ui.postowner.value.username}`
    }
    this.socket.emit('message-sent',messagepayload)
   }

   public getNewMessage () {
    this.socket.on('receive-message', (message) =>{
      this.message$.next(message);
    });
    
    return this.message$.asObservable();
  };



}
