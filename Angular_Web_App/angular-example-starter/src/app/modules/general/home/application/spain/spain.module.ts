import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpainRoutingModule } from './spain-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpainComponent } from './spain.component';
import { PaginationModule } from "ngx-bootstrap/pagination";
import {ModalModule,BsModalService } from "ngx-bootstrap/modal";
import{ TooltipModule } from "ngx-bootstrap/tooltip"
import{TypeaheadModule} from "ngx-bootstrap/typeahead"

@NgModule({
  declarations: [SpainComponent],
  imports: [
    CommonModule,
    SpainRoutingModule,FormsModule, ReactiveFormsModule,ModalModule.forRoot(),TooltipModule.forRoot(),TypeaheadModule.forRoot(),
    PaginationModule.forRoot()
  ],
  providers: [BsModalService]
})
export class SpainModule { }
