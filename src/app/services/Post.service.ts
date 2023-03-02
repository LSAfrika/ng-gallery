import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../interface/post.interface';
import { catchError, delay, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  pagination = 0;
POST_URL = 'http://localhost:4555/photos/post';
 fetchposturl = 'http://localhost:4555/photos/allposts?pagination=';
 fetchsingleposturl = 'http://localhost:4555/photos/singlepost/';
 categoriesurl = 'http://localhost:4555/photos/allposts/category?category=';
 commenturl='http://localhost:4555/comments/post/'
 likeurl='http://localhost:4555/likes/post/'
 postid=''

 category=''
//  snapshareview:Observable<Post[]>
 fixedcategories = '';
paination=0
 fetchnextsnapshares=new BehaviorSubject<number>(0)
 snapshares: BehaviorSubject<Post[]> = new  BehaviorSubject<Post[]>([]);
// allposts: Post[] = [];
initialload=false

  // snapshareview$=this.fetchnextsnapshares.pipe( switchMap((page)=>{console.log(page);
  //  return this.getpost(page)}),map((result:any)=>{ console.log(result);
  //   return this.allposts=[...this.allposts,...result.posts]}))
  constructor(private http: HttpClient) {
    // this.getpost()

      if(this.initialload===false) this.fetchsubscriptionlogic()
   }








  Poststatus(post: FormData): Observable<any> {
    console.log('data:', post);

    const token = localStorage.getItem('auth');

    // ,{headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)}
    return this.http.post<any>(this.POST_URL, post);
   }


   fetchnextsetofposts(){
    this.pagination++
  this.fetchsubscriptionlogic()
   }

   fetchsubscriptionlogic(){
    this.getpost(this.pagination)
     .pipe(tap((res:any)=>{this.snapshares.next([...this.snapshares.value, ...res.posts as Post[]]),this.initialload=true}))
     .subscribe()
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
    // this.allposts = [];
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

    // this.allposts = [];
    this.category=''
    // this.snapshares.next(this.allposts);
    this.fetchnextsnapshares.next(0)

    // this.getpost();
   }



   postcomment(id,comment):Observable<any>{
    const posturl= this.commenturl+id
    this.postid=id
     return this.http.post(posturl,comment)
   }

   likepost(id):Observable<any>{
    this.postid=id

    const posturl=this.likeurl+id
    return this.http.post<any>(posturl,{})
   }
}
