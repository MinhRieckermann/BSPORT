import { AlertService } from './../shared/services/alert.service';
import { AccountService } from './../shared/services/account.service';

import { Component, OnInit,Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import custom validator to validate that password and confirm password fields match
import{MustMatch} from './../helper/'
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private formBuider:FormBuilder,
    private router:Router,
    private accountService:AccountService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuider.group({
       //firstName: ['', Validators.required],
      //lastName: ['', Validators.required],
      email: ['', Validators.required],
      password:['', [Validators.required, Validators.minLength(6)]],
      confirmPassword:['', Validators.required]
  }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  }

// convenience getter for easy access to form fields
get f() { return this.registerForm.controls; }

onSubmit()
{
  this.submitted=true;
 // stop here if form is invalid
        if (this.registerForm.invalid) {
              return;
        }
        this.loading=true;
this.accountService.registeraccount(this.registerForm.value).pipe(first()).subscribe(
  data=>{
  
    this.alertService.success('Registration successful', true);
    this.router.navigate(['/signin']);
        },
    error => {
      this.alertService.error(error);
      this.loading = false;
    }


)


}
}
