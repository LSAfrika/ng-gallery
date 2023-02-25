import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../interface/post.interface';
import { catchError, delay, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  pagination = 0;
POST_URL = 'http://localhost:4555/photos/post';
 fetchposturl = 'http://localhost:4555/photos/allposts?pagination=';
 fetchsingleposturl = 'http://localhost:4555/photos/singlepost/';
 categoriesurl = 'http://localhost:4555/photos/allposts/category?category=';

 category=''
//  snapshareview:Observable<Post[]>
 fixedcategories = '';

 fetchnextsnapshares=new BehaviorSubject<number>(0)
 snapshares: BehaviorSubject<Post[]> = new  BehaviorSubject<Post[]>([]);
allposts: Post[] = [];


  snapshareview$=this.fetchnextsnapshares.pipe( switchMap((page)=>{console.log(page);
   return this.getpost(page)}),map((result:any)=>{ console.log(result);
    return this.allposts=[...this.allposts,...result.posts]}))
  constructor(private http: HttpClient) {
    // this.getpost()
   }


  Poststatus(post: FormData): Observable<any> {
    console.log('data:', post);

    const token = localStorage.getItem('auth');

    // ,{headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)}
    return this.http.post<any>(this.POST_URL, post);
   }

   getpost(page): Observable<any>{
   // tslint:disable-next-line: curly
   if(this.category==='') return  this.http.get<any>(this.fetchposturl +page)
   this.fixedcategories = this.categoriesurl + this.category + '&pagination=';
   const initialcategoriesfetch = this.fixedcategories + this.fetchnextsnapshares.value;

   return this.http.get(initialcategoriesfetch)

   }

   getsinglepost(id):Observable<Post>{
    return  this.http.get<Post>(this.fetchsingleposturl+id)
   }
   getcategorypost(category: string){

    this.category=category
    this.allposts = [];
    this.fetchnextsnapshares.next(0)

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
    this.category=''
    // this.snapshares.next(this.allposts);
    this.fetchnextsnapshares.next(0)

    // this.getpost();
   }
}
