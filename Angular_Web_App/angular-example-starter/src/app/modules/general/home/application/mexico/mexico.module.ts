import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MexicoRoutingModule } from './mexico-routing.module';
import { MexicoComponent } from './mexico.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from "ngx-bootstrap/pagination";
import {ModalModule,BsModalService } from "ngx-bootstrap/modal";
import{ TooltipModule } from "ngx-bootstrap/tooltip"
import{TypeaheadModule} from "ngx-bootstrap/typeahead"
@NgModule({
  declarations: [MexicoComponent],
  imports: [
    CommonModule,
    MexicoRoutingModule,FormsModule, ReactiveFormsModule,ModalModule.forRoot(),TooltipModule.forRoot(),TypeaheadModule.forRoot(),
    PaginationModule.forRoot()
  ],
  providers: [BsModalService]
})
export class MexicoModule { }
