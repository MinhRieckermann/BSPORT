import { JapanComponent } from './japan.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaginationModule } from "ngx-bootstrap/pagination";

const routes: Routes = [
  { path: '', component: JapanComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    PaginationModule.forRoot()
  ],
  exports: [RouterModule]
})
export class JapanRoutingModule { }
