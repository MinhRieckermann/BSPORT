import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NetherlandRoutingModule } from './netherland-routing.module';
import { NetherlandComponent } from './netherland.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from "ngx-bootstrap/pagination";
import {ModalModule,BsModalService } from "ngx-bootstrap/modal";
import{ TooltipModule } from "ngx-bootstrap/tooltip"
import{TypeaheadModule} from "ngx-bootstrap/typeahead"

@NgModule({
  declarations: [NetherlandComponent],
  imports: [
    CommonModule,
    NetherlandRoutingModule,FormsModule, ReactiveFormsModule,ModalModule.forRoot(),TooltipModule.forRoot(),TypeaheadModule.forRoot(),
    PaginationModule.forRoot()
  ],
  providers: [BsModalService]
})
export class NetherlandModule { }
