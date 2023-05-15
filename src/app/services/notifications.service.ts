import { PostComponent } from '../pages/post/post.component';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { map, switchMap } from 'rxjs/operators';
import{environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

pagination = 0;
disablenotificationbutton = false;
fetchnext = new BehaviorSubject(0);
notificationsurl = environment.API+'usernotifications/notifications?pagination=';
notificationscounturl = environment.API+'usernotifications/notificationscount';
notifications$= new BehaviorSubject([]);
notificationpagination$ = new BehaviorSubject(0);
destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {
// this.fetchnext.pipe(switchMap(page => { this.pagination = page; return this.getnotfications(); } ),
//     map(notifications => {
//       // tslint:disable-next-line: curly
//       if (notifications.length < 5) this.disablenotificationbutton = true;
//       // console.log('disable value: ', this.disablenotificationbutton);

//       return this.notifications$.next([...this.notifications$.value, ...notifications]);
//     })).subscribe();

   }





   getnotfications(): Observable<[]>{
    return this.http.get<[]>(this.notificationsurl + this.notificationpagination$.value );
   }

   fetchnotificationcount(){
    return this.http.get(this.notificationscounturl)
   }

   fetchnextsetofnotifications(){
    const page = this.pagination++;
    this.fetchnext.next(this.fetchnext.value + 1);
    console.log(this.fetchnext.value);
    // console.log(this.pagination);

   }



}
