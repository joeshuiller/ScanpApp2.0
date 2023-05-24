import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateEventsRoutingModule } from './create-events-routing.module';
import { CreateEventsComponent } from './create-events.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    CreateEventsComponent
  ],
  imports: [
    CommonModule,
    CreateEventsRoutingModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class CreateEventsModule { }
