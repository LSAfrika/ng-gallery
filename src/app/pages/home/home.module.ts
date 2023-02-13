import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { ImagescontainerComponent } from '../../component/imagescontainer/imagescontainer.component';
import { ImagecardComponent } from '../../component/imagecard/imagecard.component';
import { HighlightsComponent } from '../../component/highlights/highlights.component';
import { FabComponent } from '../../component/fab/fab.component';
import { ImageuploadComponent } from '../../component/imageupload/imageupload.component';
import { NotificationsComponent } from '../../component/notifications/notifications.component';


@NgModule({
  declarations: [
    HomeComponent,


    ImagescontainerComponent,

    ImagecardComponent,
    HighlightsComponent,
    FabComponent,
    ImageuploadComponent,
    NotificationsComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
