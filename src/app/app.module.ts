import { AuthInterceptor } from './services/auth.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectmessageModule } from './pages/directmessage/directmessage.module';

// import { UploadComponent } from './component/upload/upload.component';

@NgModule({
  declarations: [
    AppComponent,
    // UploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule, DirectmessageModule,
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
