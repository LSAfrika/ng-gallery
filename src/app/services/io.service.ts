import { NotificationsService } from './notifications.service';
import { MessagesService } from './messages.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject,Subject } from 'rxjs';
import { io } from 'socket.io-client';
import { Message } from '../interface/messages.interface';
import { UiService } from './ui.service';
import{environment} from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class IOService {


  snapsharebackend = environment.API;
  // socket=io(this.snapsharebackend,{query:{uid:''}})
  socket:any
  public message$: BehaviorSubject<Message> = new BehaviorSubject(undefined);
  public messagenotifications$: BehaviorSubject<Object> = new BehaviorSubject(undefined);
  public messagenotificationscounter$ = new BehaviorSubject(undefined);
  public notifications$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  public messagesnotifications$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  public globalnotifications$ = new Subject();
  public offlinemessage$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  socketsetup = false;
  messageguard:any


  // socket=io(this.snapsharebackend)
  constructor(private ui: UiService,private messageservice:MessagesService,private notification:NotificationsService) {

    if(this.ui.logedinuser !== undefined)
    {this.socket= io(this.snapsharebackend, {query: {uid: this.ui.logedinuser._id}});}

    // console.log('socket', this.socket);
// this.setuid()
this.gloabalnotificationsound().subscribe(()=>this.notification.notificationsound())

  }

  setsocketinstanceonlogin(){
    this.socket= io(this.snapsharebackend, {query: {uid: this.ui.logedinuser._id}})

    console.log('socket on login:',this.socket);


  }

  setuid(){


    // console.log('current logged in user',this.ui.logedinuser)
    return this.socket.emit('userconnect', {  uid: this.ui.logedinuser._id});
   }

   sendmessage(message:string){
    // console.log('from', this.ui.logedinuser);
    // console.log('to', this.ui.chatowner.value);

    console.log('message payload',message);
    const trimmedmessage=  message.match(/&nbsp;/)
    console.log('trimmed message payload',trimmedmessage);


    if(trimmedmessage!=null ){
      const messagetosave=message.replace('&nbsp;','')
      console.log('message to save db',messagetosave);
      message=messagetosave
    }



    const messagepayload = {
     from: this.ui.logedinuser._id,
     to: this.ui.chatowner.value._id,
     chatid: `${this.ui.logedinuser._id}:${this.ui.chatowner.value._id}`,
     viewed: false,
      message
    };

    console.log('message to be sent ',messagepayload);

    this.socket.emit('message-sent', messagepayload,(response)=>{

      if(response.sent==true)  this.messageservice.userchat$.next([...this.messageservice.userchat$.value,messagepayload])
      console.log('callback from message sent',response);

    });
   }

   commentnotifcation(postid,userid,actiontype){

   const Notificationpayload={
      postid,
      userid,
      action:actiontype

    }
    this.socket.emit('emitnotification',Notificationpayload)
   }

    getNewMessage () {

      // console.log('received online message being hit');
    this.socket.on('online-message', (message) =>{
console.log('socket get new message: ',message);

      this.message$.next(message);
    });
// console.log('currentmessage online chat: ',this.message$.value);

    return this.message$.asObservable();
  }

NewMessageNotification () {

    // console.log('received online message being hit');
  this.socket.on('new-message-notification', (message) =>{
// console.log('socket get new message: ',message);

    this.messagenotifications$.next(message);
  });
// console.log('currentmessage online chat: ',this.message$.value);
  return this.messagenotifications$.asObservable();
}

NewMessageNotificationcounter () {

   console.log('message counter being hit');
this.socket.on('live_message_notification', messagecount =>{
console.log('socket get new message count: ',messagecount);

  this.messagenotificationscounter$.next(messagecount);
});
 console.log('currentmessage online chat: ',this.messagenotificationscounter$.value);
return this.messagenotificationscounter$.asObservable();
}
offlinenewmessage(){

  this.socket.on('receive-offline-message', (message) =>{
    this.offlinemessage$.next(message);
  });

  return this.offlinemessage$.asObservable();

}


homepagenotifications(){
 // console.log('notifications being hit');
  this.socket.on('comment_notification',notification=>{
   // console.log('new comment notification ',notification)
      this.notifications$.next(notification)
  })

  return this.notifications$.asObservable()

}
homepagemessages(){
  // console.log('notifications being hit');
   this.socket.on('live_message_notification',notification=>{
     console.log('new comment notification ',notification)
       this.messagesnotifications$.next(notification)
   })

   return this.messagesnotifications$.asObservable()

 }


gloabalnotificationsound(){

  this.socket.on('global_notification',notification=>{
    // console.log('new comment notification ',notification)
       this.globalnotifications$.next(notification)
   })

   return this.globalnotifications$.asObservable()

}


}
