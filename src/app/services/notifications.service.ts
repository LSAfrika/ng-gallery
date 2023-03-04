import { PostComponent } from '../pages/post/post.component';
import { BehaviorSubject, Observable,Subject } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
import { map, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

pagination=0
fetchnext=new BehaviorSubject(0)
notificationsurl='http://localhost:4555/usernotifications/notfications?pagination='
notifications$:BehaviorSubject<[]>=new BehaviorSubject([])
destroy$:Subject<boolean>=new Subject<boolean>()

  constructor(private http:HttpClient) {
this.fetchnext.pipe(switchMap(page=>{ this.pagination = page; return this.getnotfications(); } ),
    map(notifications=>{this.notifications$.next([...this.notifications$.value,...notifications]),console.log(this.notifications$.value
      );
    })).subscribe()

   }





   getnotfications():Observable<[]>{
    return this.http.get<[]>(this.notificationsurl+this.pagination)
   }

   fetchnextsetofnotifications(){
    this.fetchnext.next(this.pagination++)
   }
}
