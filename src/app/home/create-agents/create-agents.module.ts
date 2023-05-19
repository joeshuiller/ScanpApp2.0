import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateAgentsRoutingModule } from './create-agents-routing.module';
import { CreateAgentsComponent } from './create-agents.component';


@NgModule({
  declarations: [
    CreateAgentsComponent
  ],
  imports: [
    CommonModule,
    CreateAgentsRoutingModule
  ]
})
export class CreateAgentsModule { }
