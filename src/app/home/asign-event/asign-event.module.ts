import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsignEventRoutingModule } from './asign-event-routing.module';
import { AsignEventComponent } from './asign-event.component';


@NgModule({
  declarations: [
    AsignEventComponent
  ],
  imports: [
    CommonModule,
    AsignEventRoutingModule
  ]
})
export class AsignEventModule { }
