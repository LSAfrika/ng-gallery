import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor() { }
open=0
  
  togglenotifications(){
    console.log(this.open);
    if(this.open===1) return this.open=2
    if(this.open===2) return this.open=1
    if(this.open===0)return this.open=1;

  }
}
