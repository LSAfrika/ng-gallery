import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';
import { DirectmessageComponent } from '../directmessage/directmessage.component';
import { FriendlistComponent } from '../../component/friendlist/friendlist.component';


@NgModule({
  declarations: [
    MessagesComponent,
    FriendlistComponent,
    // DirectmessageComponent
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule,SharedModule
  ]
})
export class MessagesModule { }
