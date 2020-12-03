import { AppSettings } from "./../shared/constant/TSconstands.component";
import { UserService } from "./../shared/services/user.service";
import { SkillService } from "./../shared/services/skillservice.service";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { timeout } from "rxjs/operators";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  isRemember: boolean = false;
  isLoginError: boolean = false;
  errormes: string;
  constructor(
    private router: Router,
    public userService: UserService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    localStorage.clear();
  }

  onFilterChange(eve: any) {
    if (eve.target.checked) {
      this.isRemember = true;
    } else {
      this.isRemember = false;
    }
  }

  OnSubmit(userName, password) {
    this.spinner.show();
    this.userService.userAuthentication(userName, password).subscribe(
      (data: any) => {
        var timeexpires = new Date();
        localStorage.setItem("userToken", data.access_token);
        localStorage.setItem("userNo", data.UserNo);
        localStorage.setItem("TokenExpire", timeexpires.toLocaleString());
        localStorage.setItem("refreshToken", data.refresh_token);
        localStorage.setItem("F5TokenExpire", timeexpires.toLocaleString());
        sessionStorage.setItem("IsLogin", "true");
        this.spinner.hide();
        this.router.navigateByUrl("/home");
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
        this.spinner.hide();
      }
    );
  }
}
