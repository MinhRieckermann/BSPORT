import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralPageNotFoundComponent } from '../home/pagenotfound/pagenotfound.component';
import { NgxSpinnerModule } from 'ngx-spinner';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    children :[
       {
        path: '',
        component: LoginComponent
      },
      {
        path: 'pagenotfound',component:GeneralPageNotFoundComponent
    },
    ],
    
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgxSpinnerModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
