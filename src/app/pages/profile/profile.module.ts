import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { EditComponent } from 'src/app/component/edit/edit.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProfileComponent,EditComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,FormsModule
  ]
})
export class ProfileModule { }
