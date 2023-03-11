import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';
import { DirectmessageComponent } from '../../directmessage/directmessage.component';


@NgModule({
  declarations: [
    MessagesComponent,
    DirectmessageComponent
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule,SharedModule
  ]
})
export class MessagesModule { }
