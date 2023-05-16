import { AuthInterceptor } from './services/auth.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//  import { NotifierModule } from 'angular-notifier';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectmessageModule } from './pages/directmessage/directmessage.module';
import {PlatformModule}from '@angular/cdk/platform';
// import { UploadComponent } from './component/upload/upload.component';

@NgModule({
  declarations: [
    AppComponent,
    // UploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    //  NotifierModule,
    PlatformModule,
    DirectmessageModule,

  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
