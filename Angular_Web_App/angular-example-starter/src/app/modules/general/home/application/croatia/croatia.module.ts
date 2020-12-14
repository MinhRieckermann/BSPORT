import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CroatiaRoutingModule } from './croatia-routing.module';
import { PaginationModule } from "ngx-bootstrap/pagination";
import {ModalModule,BsModalService } from "ngx-bootstrap/modal";
import{ TooltipModule } from "ngx-bootstrap/tooltip"
import{TypeaheadModule} from "ngx-bootstrap/typeahead"

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CroatiaRoutingModule,ModalModule.forRoot(),TooltipModule.forRoot(),TypeaheadModule.forRoot()
  ],
  providers: [BsModalService]
})
export class CroatiaModule { }
