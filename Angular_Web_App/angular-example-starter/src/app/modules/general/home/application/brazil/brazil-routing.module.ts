import { BrazilComponent } from './brazil.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: BrazilComponent,
  children: [
    { path: 'Brasileiro Serie A',
    loadChildren: () => import('./brasileiro-serie-a/brasileiro-serie-a.module')
      .then(mod => mod.BrasileiroSerieAModule)},
      { path: 'Brasileiro Serie B',
    loadChildren: () => import('./brasileiro-serie-b/brasileiro-serie-b.module')
      .then(mod => mod.BrasileiroSerieBModule)}
  ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrazilRoutingModule { }
