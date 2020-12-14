import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScotlandComponent } from './scotland.component';

const routes: Routes = [
  {path:'',component:ScotlandComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScotlandRoutingModule { }
