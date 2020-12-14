import { EnglandComponent } from './england.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { EnglandRoutingModule } from './england-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from "ngx-bootstrap/pagination";
import {ModalModule,BsModalService } from "ngx-bootstrap/modal";
import{ TooltipModule } from "ngx-bootstrap/tooltip"
import{TypeaheadModule} from "ngx-bootstrap/typeahead"

@NgModule({
  declarations: [EnglandComponent],
  imports: [
    CommonModule,
    EnglandRoutingModule,
    FormsModule,
    ReactiveFormsModule,ModalModule.forRoot(),TooltipModule.forRoot(),TypeaheadModule.forRoot(),
    PaginationModule.forRoot()
  ],
  providers: [BsModalService]
})
export class EnglandModule { }
