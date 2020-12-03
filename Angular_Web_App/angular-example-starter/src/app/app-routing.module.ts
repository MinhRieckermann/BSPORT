import { HomeComponent } from './modules/general/home/home.component';
import { AuthGuard } from './modules/general/auth/auth.guard';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';




const routes: Routes = [
  { path: '',redirectTo:'/home', pathMatch : 'full' ,
   canActivate  : [AuthGuard] },
  { path: 'home', loadChildren:()=>import ('./modules/general/home/home.module').then(mod=>mod.HomeModule)  },
  { path: 'register', loadChildren:()=>import ('./modules/general/register/register.module').then(mod=>mod.RegisterModule) },
  { path: 'signin', loadChildren:()=>import('./modules/general/signin/signin.module').then(mod=>mod.SigninModule) }
 
    
  
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
