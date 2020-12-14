import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SerbiaRoutingModule } from './serbia-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SerbiaComponent } from './serbia.component';
import { PaginationModule } from "ngx-bootstrap/pagination";
import {ModalModule,BsModalService } from "ngx-bootstrap/modal";
import{ TooltipModule } from "ngx-bootstrap/tooltip"
import{TypeaheadModule} from "ngx-bootstrap/typeahead"

@NgModule({
  declarations: [SerbiaComponent],
  imports: [
    CommonModule,
    SerbiaRoutingModule,FormsModule, ReactiveFormsModule,ModalModule.forRoot(),TooltipModule.forRoot(),TypeaheadModule.forRoot(),
    PaginationModule.forRoot()
  ],
  providers: [BsModalService]
})
export class SerbiaModule { }
