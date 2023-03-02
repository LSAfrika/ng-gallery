import { User } from './../interface/post.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {


  opennotificationspanel = 0;
  openimageuploader = 0;
  uploading=false
postowner:User
  categoryposts=false
  logedinuser: User = undefined;


  constructor() {

    this.user()

       }

  user(){
    const token=localStorage.getItem('auth').split('.')[1]
    if(token){


      const uservalue:any= JSON.parse(atob(token))
      this.logedinuser=uservalue
      console.log('current user: ',uservalue);
    }

  }
  togglenotifications() {
    console.log('before', this.opennotificationspanel);
    if (this.opennotificationspanel === 1) { return this.opennotificationspanel = 2 }
    if (this.opennotificationspanel === 2) { return this.opennotificationspanel = 1 }
    if (this.opennotificationspanel === 0) { return this.opennotificationspanel = 1; }
    console.log('after', this.opennotificationspanel);


  }
  resetnotificationpanel(){
    this.opennotificationspanel=0
  }

  toggleimageuploader() {
    console.log('before modal', this.openimageuploader);
    if (this.openimageuploader === 1) { return this.openimageuploader = 2 }
    if (this.openimageuploader === 2) { return this.openimageuploader = 1 }
    if (this.openimageuploader === 0) { return this.openimageuploader = 1; }
    console.log('after modal', this.openimageuploader);


  }

  categoriesactive(){
    this.categoryposts=true
  }

  categoriesinactive(){
    this.categoryposts=false
  }

}
