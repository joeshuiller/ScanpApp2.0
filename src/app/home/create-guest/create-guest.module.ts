import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateGuestRoutingModule } from './create-guest-routing.module';
import { CreateGuestComponent } from './create-guest.component';


@NgModule({
  declarations: [
    CreateGuestComponent
  ],
  imports: [
    CommonModule,
    CreateGuestRoutingModule
  ]
})
export class CreateGuestModule { }
