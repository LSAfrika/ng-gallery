import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { ImagescontainerComponent } from './component/imagescontainer/imagescontainer.component';
import { NavComponent } from './component/nav/nav.component';
import { ImagecardComponent } from './component/imagecard/imagecard.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ImagescontainerComponent,
    NavComponent,
    ImagecardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
