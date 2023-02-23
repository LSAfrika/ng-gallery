import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../interface/post.interface';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  pagination = 0;
POST_URL = 'http://localhost:4555/photos/post';
 fetchposturl = 'http://localhost:4555/photos/allposts?pagination=';
 categoriesurl = 'http://localhost:4555/photos/allposts/category?category=';
 fixedcategories = '';

 snapshares: BehaviorSubject<Post[]> = new  BehaviorSubject<Post[]>([]);
allposts: Post[] = [];



  constructor(private http: HttpClient) {
    this.getpost()
   }


  Poststatus(post: FormData): Observable<any> {
    console.log('data:', post);

    const token = localStorage.getItem('auth');

    // ,{headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)}
    return this.http.post<any>(this.POST_URL, post);
   }

   getpost(){
// console.log(this.pagination);
// console.log(this.fetchposturl+this.pagination);

     this.http.get<any>(this.fetchposturl + this.pagination).
     pipe(map((posts) => { this.allposts = [...this.allposts , ...posts.allposts] ;
                           this.snapshares.next(this.allposts);
    }))
    .subscribe();

   }

   getcategorypost(category: string){
    this.pagination = 0;
     this.allposts = [];
    // this.snapshares.next(this.allposts);
    this.snapshares.next([]);
    this.fixedcategories = this.categoriesurl + category + '&pagination=';
    const initialfetch = this.fixedcategories + this.pagination;
     // tslint:disable-next-line: align
     return this.http.get(initialfetch).
     pipe(map((posts: any) => {  this.snapshares.next([...this.snapshares.value,...posts.categoryposts]);  })).subscribe();
   }

   getcategorypostnext(){

    this.pagination++;
    const fetchnextset = this.fixedcategories + this.pagination;
     // tslint:disable-next-line: align
     console.log(fetchnextset);

    return this.http.get(fetchnextset).
     pipe(map((posts: any) => {   this.snapshares.next([...this.snapshares.value,...posts.categoryposts]); })).subscribe();
   }

   resetcategorypost(){

    this.allposts = [];
    this.snapshares.next(this.allposts);
    this.getpost();
   }
}
