import { JapanComponent } from './japan.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JapanRoutingModule } from './japan-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrettyjsonPipe } from './prettyjson.pipe';
import { PaginationModule } from "ngx-bootstrap/pagination";
import {ModalModule,BsModalService } from "ngx-bootstrap/modal";
import{ TooltipModule } from "ngx-bootstrap/tooltip"
import{TypeaheadModule} from "ngx-bootstrap/typeahead"

@NgModule({
  declarations: [
    JapanComponent,
    PrettyjsonPipe
  ],
  imports: [
    CommonModule,
    JapanRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PaginationModule.forRoot(),ModalModule.forRoot(),TooltipModule.forRoot(),TypeaheadModule.forRoot()

  ],
  exports:[JapanComponent],
  providers: [BsModalService]
})
export class JapanModule { }
