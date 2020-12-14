import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortugalRoutingModule } from './portugal-routing.module';
import { PortugalComponent } from './portugal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from "ngx-bootstrap/pagination";
import {ModalModule,BsModalService } from "ngx-bootstrap/modal";
import{ TooltipModule } from "ngx-bootstrap/tooltip"
import{TypeaheadModule} from "ngx-bootstrap/typeahead"
@NgModule({
  declarations: [PortugalComponent],
  imports: [
    CommonModule,
    PortugalRoutingModule,FormsModule, ReactiveFormsModule,ModalModule.forRoot(),TooltipModule.forRoot(),TypeaheadModule.forRoot(),
    PaginationModule.forRoot()
  ],
  providers: [BsModalService]
})
export class PortugalModule { }
