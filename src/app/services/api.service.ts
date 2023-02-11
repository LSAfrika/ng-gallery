import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  snapsharebackend='http://localhost:4555'
socket=io(this.snapsharebackend)
  constructor() {

    
   }
}
