import { PostComponent } from './../pages/post/post.component';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
@Injectable({
  providedIn: 'root'
})
export class ApiService {
//   snapsharebackend='http://localhost:4555'
// socket=io(this.snapsharebackend)

ROOT_URL='http://localhost:4555/'
refreshurl='http://localhost:4555/user/refresh'


  constructor(private http:HttpClient) {


   }





   getallposts():Observable<{}>{
    return this.http.get(this.ROOT_URL+'photos/allposts?pagination=1')
   }

}
