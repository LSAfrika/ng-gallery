import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from '../component/sidenav/sidenav.component';
import { NavComponent } from '../component/nav/nav.component';



@NgModule({
  declarations: [
    SidenavComponent,NavComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SidenavComponent,NavComponent

  ]

})
export class SharedModule { }
