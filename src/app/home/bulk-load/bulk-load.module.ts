import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BulkLoadRoutingModule } from './bulk-load-routing.module';
import { BulkLoadComponent } from './bulk-load.component';


@NgModule({
  declarations: [
    BulkLoadComponent
  ],
  imports: [
    CommonModule,
    BulkLoadRoutingModule
  ]
})
export class BulkLoadModule { }
