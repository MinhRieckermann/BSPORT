import { PrimeModule } from './../shared/ng-prime/prime.module';
import { MaterialModule } from './../shared/materials/material-module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralPageNotFoundComponent } from '../home/pagenotfound/pagenotfound.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RegisterComponent } from './register/register.component';
import { PopupLoginDialogComponent } from './login-popup/popup.component';
import { RegisterDetailComponent } from './reg-detail/reg-detail.component';
import { AuthGuard } from '../auth/auth.guard';



const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    children :[
       {
        path: '',
        component: LoginComponent
      },         
    ],    
    
  },
  {
    path:'register',
    component:RegisterComponent
  },  
  {
    path : 'reg-detail/:id', component:RegisterDetailComponent,
  },
  {
    path: 'pagenotfound',component:GeneralPageNotFoundComponent
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgxSpinnerModule,
    MaterialModule,
    ReactiveFormsModule,
    PrimeModule,
  ],
  declarations: [LoginComponent,RegisterComponent,PopupLoginDialogComponent,RegisterDetailComponent],
  entryComponents: [
    PopupLoginDialogComponent,
  ],
})
export class LoginModule { }
