import { DirectmessageComponent } from './directmessage.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectmessageRoutingModule } from './directmessage-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DirectmessageComponent
  ],
  imports: [
    CommonModule,
    DirectmessageRoutingModule,
    SharedModule,
    FormsModule,ReactiveFormsModule


  ]
})
export class DirectmessageModule { }
