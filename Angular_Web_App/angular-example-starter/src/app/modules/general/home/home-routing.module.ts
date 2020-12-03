import { AuthGuard } from './../auth/auth.guard';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  { path: '', component: HomeComponent,
  canActivate: [AuthGuard], 
  children: [
    {
      path: 'Brazil',
      loadChildren: () => import('./application/brazil/brazil.module')
        .then(mod => mod.BrazilModule)
    },
    {
      path: 'England',
      loadChildren: () => import('./application/england/england.module')
        .then(mod => mod.EnglandModule)
    },
    {
      path: 'Germany',
      loadChildren: () => import('./application/germany/germany.module')
        .then(mod => mod.GermanyModule)
    },
    {
      path: 'Italy',
      loadChildren: () => import('./application/italy/italy.module')
        .then(mod => mod.ItalyModule)
    },
    {
      path: 'Japan',
      loadChildren: () => import('./application/japan/japan.module')
        .then(mod => mod.JapanModule)
    }
  ]}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
