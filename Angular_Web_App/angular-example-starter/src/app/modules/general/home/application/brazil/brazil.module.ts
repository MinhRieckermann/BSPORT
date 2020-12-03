import { BrazilComponent } from './brazil.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrazilRoutingModule } from './brazil-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BrazilComponent
  ],
  imports: [
    CommonModule,
    BrazilRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class BrazilModule { }
