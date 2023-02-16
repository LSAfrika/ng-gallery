import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from '../component/sidenav/sidenav.component';
import { NavComponent } from '../component/nav/nav.component';
import { SpinnerComponent } from './spinner/spinner.component';



@NgModule({
  declarations: [
    SidenavComponent,NavComponent, SpinnerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SidenavComponent,NavComponent,SpinnerComponent

  ]

})
export class SharedModule { }
