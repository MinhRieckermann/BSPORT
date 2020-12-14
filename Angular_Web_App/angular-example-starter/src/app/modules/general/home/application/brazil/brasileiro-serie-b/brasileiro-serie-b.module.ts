import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { BrasileiroSerieBComponent } from './brasileiro-serie-b.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrasileiroSerieBRoutingModule } from './brasileiro-serie-b-routing.module';
import { PaginationModule } from "ngx-bootstrap/pagination";
import {ModalModule,BsModalService } from "ngx-bootstrap/modal";
import{ TooltipModule } from "ngx-bootstrap/tooltip"
import{TypeaheadModule} from "ngx-bootstrap/typeahead"



@NgModule({
  declarations: [BrasileiroSerieBComponent],
  imports: [
    CommonModule,
    BrasileiroSerieBRoutingModule,
    ReactiveFormsModule,
    FormsModule,ModalModule.forRoot(),TooltipModule.forRoot(),TypeaheadModule.forRoot(),
    PaginationModule.forRoot()
  ],
  providers: [BsModalService]
})
export class BrasileiroSerieBModule { }
