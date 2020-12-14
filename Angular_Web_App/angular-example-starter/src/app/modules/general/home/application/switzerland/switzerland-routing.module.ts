import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SwitzerlandComponent } from './switzerland.component';


const routes: Routes = [
  { path: '', component: SwitzerlandComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SwitzerlandRoutingModule { }
