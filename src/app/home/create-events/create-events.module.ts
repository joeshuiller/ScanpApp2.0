import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateEventsRoutingModule } from './create-events-routing.module';
import { CreateEventsComponent } from './create-events.component';


@NgModule({
  declarations: [
    CreateEventsComponent
  ],
  imports: [
    CommonModule,
    CreateEventsRoutingModule
  ]
})
export class CreateEventsModule { }
