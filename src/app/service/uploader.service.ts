import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploaderService {

POST_URL='http://localhost:4555/photos/post'

  constructor(private http:HttpClient) { }


  Poststatus(post:FormData):Observable<any> {
    console.log('data:',post);

    const token=localStorage.getItem('auth')

    // ,{headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)}
    return this.http.post<any>(this.POST_URL,post)
   }
}
