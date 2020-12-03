
import { LoginComponent } from './login/login.component';

import { Routes } from '@angular/router'
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { GeneralPageNotFoundComponent } from './home/pagenotfound/pagenotfound.component';

export const appRoutes: Routes = [
    { path: '',
      component: DashboardComponent,
      canActivate  : [AuthGuard]
    },
    {
        path: 'login', component: LoginComponent
    },   
    {
        path: 'pagenotfound',component:GeneralPageNotFoundComponent
    },    
    { path : '**', redirectTo:'/pagenotfound', pathMatch : 'full'}

];
