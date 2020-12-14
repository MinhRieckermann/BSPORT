import { ScotlandComponent } from './scotland.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScotlandRoutingModule } from './scotland-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from "ngx-bootstrap/pagination";
import {ModalModule,BsModalService } from "ngx-bootstrap/modal";
import{ TooltipModule } from "ngx-bootstrap/tooltip"
import{TypeaheadModule} from "ngx-bootstrap/typeahead"


@NgModule({
  declarations: [ScotlandComponent],
  imports: [
    CommonModule,
    ScotlandRoutingModule,FormsModule, ReactiveFormsModule,ModalModule.forRoot(),TooltipModule.forRoot(),TypeaheadModule.forRoot(),
    PaginationModule.forRoot()
  ],
  providers: [BsModalService]
})
export class ScotlandModule { }
