import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GreeceComponent } from './greece.component';

const routes: Routes = [
  { path: '', component: GreeceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GreeceRoutingModule { }
