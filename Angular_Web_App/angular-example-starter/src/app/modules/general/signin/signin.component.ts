import { Router } from '@angular/router';
import { AlertService } from './../shared/services/alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AppSettings } from './../shared/constant/tsconstant';
import { AccountService } from './../shared/services/account.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  isRemember: boolean = false;
  isLoginError: boolean = false;
  errormes: string;

  constructor(
    private Router:Router,
    public accountService:AccountService
  ) { }

  ngOnInit(): void {
    localStorage.clear();
  }
  OnSubmit(userName, password) {
    
    this.accountService.userAuthentication(userName, password).subscribe(
      (data: any) => {
        var timeexpires = new Date();
        localStorage.setItem("userToken", data.access_token);
        localStorage.setItem("userNo", data.UserNo);
        localStorage.setItem("TokenExpire", timeexpires.toLocaleString());
        localStorage.setItem("refreshToken", data.refresh_token);
        localStorage.setItem("F5TokenExpire", timeexpires.toLocaleString());
        localStorage.setItem("UserName", data.userName);
        sessionStorage.setItem("IsLogin", "true");
        
        this.Router.navigateByUrl("/home");
      },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
        console.log(typeof err.status);
        if (typeof err.status == "undefined") {
          this.errormes = err.message;
        } else {
          if (err.status != 400) {
            this.errormes = "The user name or password is incorrect.";
          } else {
            this.errormes = err.error.error_description;
          }
        }
        
      }
    );
  }

}
