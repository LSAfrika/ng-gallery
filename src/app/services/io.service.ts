import { MessagesService } from './messages.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';
import { Message } from '../interface/messages.interface';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class IOService {


  snapsharebackend = 'http://localhost:4555';
  // socket=io(this.snapsharebackend,{query:{uid:''}})
  socket:any
  public message$: BehaviorSubject<Message> = new BehaviorSubject(undefined);
  public offlinemessage$: BehaviorSubject<any> = new BehaviorSubject(undefined);
socketsetup = false;


  // socket=io(this.snapsharebackend)
  constructor(private ui: UiService,private messageservice:MessagesService) {

    if(this.ui.logedinuser !== undefined)
    {this.socket= io(this.snapsharebackend, {query: {uid: this.ui.logedinuser._id}});}

    console.log('socket', this.socket);
// this.setuid()

  }

  setsocketinstanceonlogin(){
    this.socket= io(this.snapsharebackend, {query: {uid: this.ui.logedinuser._id}})

    console.log('socket on login:',this.socket);


  }

  setuid(){


    // console.log('current logged in user',this.ui.logedinuser)
    return this.socket.emit('userconnect', {  uid: this.ui.logedinuser._id});
   }

   sendmessage(message){
    // console.log('from', this.ui.logedinuser);
    // console.log('to', this.ui.chatowner.value);

    const messagepayload = {
     from: this.ui.logedinuser._id,
     to: this.ui.chatowner.value._id,
     chatid: `${this.ui.logedinuser._id}:${this.ui.chatowner.value._id}`,
     viewed: false,
      message
    };
    this.socket.emit('message-sent', messagepayload,(response)=>{

      if(response.sent==true)  this.messageservice.userchat$.next([...this.messageservice.userchat$.value,messagepayload])
      console.log('callback from message sent',response);

    });
   }

    getNewMessage () {

      console.log('received online message being hit');
    this.socket.on('online-message', (message) =>{

      this.message$.next(message);
    });
console.log('currentmessage online chat: ',this.message$.value);

    return this.message$.asObservable();
  }
offlinenewmessage(){

  this.socket.on('receive-offline-message', (message) =>{
    this.offlinemessage$.next(message);
  });

  return this.offlinemessage$.asObservable();

}


}
