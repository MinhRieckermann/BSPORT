import { EcuadorComponent } from './ecuador.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EcuadorRoutingModule } from './ecuador-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from "ngx-bootstrap/pagination";
import {ModalModule,BsModalService } from "ngx-bootstrap/modal";
import{ TooltipModule } from "ngx-bootstrap/tooltip"
import{TypeaheadModule} from "ngx-bootstrap/typeahead"

@NgModule({
  declarations: [EcuadorComponent],
  imports: [
    CommonModule,
    EcuadorRoutingModule,FormsModule, ReactiveFormsModule,ModalModule.forRoot(),TooltipModule.forRoot(),TypeaheadModule.forRoot(),
    PaginationModule.forRoot()
  ],
  providers: [BsModalService]
})
export class EcuadorModule { }
