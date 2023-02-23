import { NotificationsComponent } from './../component/notifications/notifications.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from '../component/sidenav/sidenav.component';
import { NavComponent } from '../component/nav/nav.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { CategoryComponent } from '../component/category/category.component';



@NgModule({
  declarations: [
    SidenavComponent,NavComponent, SpinnerComponent,NotificationsComponent, CategoryComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SidenavComponent,NavComponent,SpinnerComponent,NotificationsComponent,CategoryComponent

  ]

})
export class SharedModule { }
