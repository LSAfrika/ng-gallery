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
socketsetup = false;

  // socket=io(this.snapsharebackend)
  constructor(private ui: UiService) {

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
    console.log('from', this.ui.logedinuser);
    console.log('to', this.ui.chatowner.value);

    const messagepayload = {
     from: this.ui.logedinuser._id,
     to: this.ui.chatowner.value._id,
     chatuid: `${this.ui.logedinuser._id}:${this.ui.chatowner.value._id}`,
     viewed: false,
      message
    };
    this.socket.emit('message-sent', messagepayload);
   }

  //  public getNewMessage () {
  //   this.socket.on('receive-message', (message) =>{
  //     this.message$.next(message);
  //   });

  //   return this.message$.asObservable();
  // }



}
