import { FranceComponent } from './france.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FranceRoutingModule } from './france-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from "ngx-bootstrap/pagination";
import {ModalModule,BsModalService } from "ngx-bootstrap/modal";
import{ TooltipModule } from "ngx-bootstrap/tooltip"
import{TypeaheadModule} from "ngx-bootstrap/typeahead"


@NgModule({
  declarations: [FranceComponent],
  imports: [
    CommonModule,
    FranceRoutingModule,FormsModule, ReactiveFormsModule,ModalModule.forRoot(),TooltipModule.forRoot(),TypeaheadModule.forRoot(),
    PaginationModule.forRoot()
  ],
  providers: [BsModalService]
})
export class FranceModule { }
