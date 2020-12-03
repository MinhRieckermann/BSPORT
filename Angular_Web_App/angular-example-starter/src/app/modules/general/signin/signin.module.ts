import { SigninComponent } from './signin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule }    from '@angular/forms';
import { SigninRoutingModule } from './signin-routing.module';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    component: SigninComponent,
    children :[
       {
        path: '',
        component: SigninComponent
      }
    ],
    
  },
];

@NgModule({
  declarations: [SigninComponent],
  imports: [
    CommonModule,
    SigninRoutingModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports:[SigninComponent]
})
export class SigninModule { }
