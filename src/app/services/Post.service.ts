import { UiService } from 'src/app/services/ui.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post, User } from '../interface/post.interface';
import { catchError, delay, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  pagination = 0;
  paginationfollowers=-1
  paginationfollowing=-1
POST_URL = 'http://localhost:4555/photos/post';
 fetchposturl = 'http://localhost:4555/photos/allposts?pagination=';
 fetchsingleposturl = 'http://localhost:4555/photos/singlepost/';
 categoriesurl = 'http://localhost:4555/photos/allposts/category?category=';
 usersnapsharesurl = 'http://localhost:4555/photos/allposts/user?user=';
 profileid=''
 commenturl='http://localhost:4555/comments/post/'
 likeurl='http://localhost:4555/likes/post/'
 commentdeleteurl='http://localhost:4555/comments/delete/'
 fetchuserposturl='http://localhost:4555/photos/allposts/user/?user='
 fetchprofile='http://localhost:4555/user/singleuser/'
 fetchfollowersurl='http://localhost:4555/user/followers/'
 fetchfollowingurl='http://localhost:4555/user/following/'
 postid=''
 userpostpagination=0
 category=''
 usersnapsharefetch=''
//  snapshareview:Observable<Post[]>
 fixedcategories = '';
paination=0
 fetchnextsnapshares=new BehaviorSubject<number>(0)
 userfollowers=new BehaviorSubject([])
 userfollowing=new BehaviorSubject([])
 snapshares: BehaviorSubject<Post[]> = new  BehaviorSubject<Post[]>([]);
postownersnapshares=new BehaviorSubject<Post[]>(undefined)

// allposts: Post[] = [];
initialload=false

  // snapshareview$=this.fetchnextsnapshares.pipe( switchMap((page)=>{console.log(page);
  //  return this.getpost(page)}),map((result:any)=>{ console.log(result);
  //   return this.allposts=[...this.allposts,...result.posts]}))
  constructor(private http: HttpClient,private ui:UiService) {
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
     .pipe(tap((res:any)=>{
     if(res.posts.length<1) this.ui.fetchnextdisabled=true

      this.snapshares.next([...this.snapshares.value, ...res.posts ]),this.initialload=true}))
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
this.ui.fetchnextdisabled=false
    this.category=category
    this.pagination=0

    console.log('catgory fetch: ',this.category);

    // this.allposts = [];
    this.fixedcategories=this.categoriesurl+this.category+'&pagination='+this.pagination

    console.log(this.fixedcategories);

    this.fetchnextsnapshares.next(0)
    this.snapshares.next([])
    this.http.get(this.fixedcategories ).
    pipe(map((posts: any) => {
      if(posts.posts.length<5) this.ui.fetchnextdisabled=true
      this.snapshares.next([...this.snapshares.value,...posts.posts]); }),

    ).subscribe(res=>{},err=>{console.log(err.message);
    });

   }

   getcategorypostnext(){

    this.pagination++;
    // const fetchnextset = this.categoriesurl + this.pagination;
    this.fixedcategories=this.categoriesurl+this.category+'&pagination='+this.pagination

     // tslint:disable-next-line: align
     console.log(this.fixedcategories);

    return this.http.get(this.fixedcategories).
     pipe(map((posts: any) => {
      if(posts.posts.length<5) this.ui.fetchnextdisabled=true

      this.snapshares.next([...this.snapshares.value,...posts.posts]); })).subscribe();
   }

   resetcategorypost(){

    // this.allposts = [];
    this.ui.fetchnextdisabled=false
    this.category=''
     this.snapshares.next([]);
    this.fetchnextsnapshares.next(0)
this.fetchsubscriptionlogic()
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

   deletecomment(id){

   return this.http.delete(this.commentdeleteurl+id)
   }

   usersnapshares(id):Observable<Post>{

    this.profileid=id
    this.usersnapsharefetch=this.fetchuserposturl+this.profileid+'&pagination='+this.userpostpagination
    return this.http.get<Post>(this.usersnapsharefetch)
   }



   user(id){
    let url=this.fetchprofile+id

    return this.http.get(url)
   }


   fetchfollowers(id){
    this.paginationfollowers++
    let followersurl=this.fetchfollowersurl+id+'?pagination='+this.paginationfollowers
    return this.http.get(followersurl)
   }


   fetchfollowing(id){
    this.paginationfollowing++
    let followersurl=this.fetchfollowingurl+id+'?pagination='+this.paginationfollowing
    return this.http.get(followersurl)
   }
}
