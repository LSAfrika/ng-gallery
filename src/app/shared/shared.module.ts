import { NotificationsComponent } from './../component/notifications/notifications.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from '../component/sidenav/sidenav.component';
import { NavComponent } from '../component/nav/nav.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { CategoryComponent } from '../component/category/category.component';
import { ImagecardComponent } from '../component/imagecard/imagecard.component';
import { RouterModule } from '@angular/router';
import { GenericmodalComponent } from './genericmodal/genericmodal.component';





@NgModule({
  declarations: [
    SidenavComponent,NavComponent, SpinnerComponent,NotificationsComponent, CategoryComponent,ImagecardComponent, GenericmodalComponent
  ],
  imports: [
    CommonModule,
    RouterModule
    // AppRoutingModule.forChild({})
  ],
  exports: [
    SidenavComponent,NavComponent,SpinnerComponent,NotificationsComponent,CategoryComponent,ImagecardComponent,GenericmodalComponent

  ]

})
export class SharedModule { }
