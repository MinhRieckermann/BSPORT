import { AppSettings } from './../../shared/constant/TSconstands.component';
import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { timeout } from "rxjs/operators";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../shared/services/user.service";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: "app--popup-login",
  templateUrl: "./popup.component.html",
  styleUrls: ["./popup.component.css"],
})
export class PopupLoginDialogComponent implements OnInit {
  isRemember: boolean = false;
  isLoginError: boolean = false;
  errormes: string;
  form: FormGroup;
  constructor(
    private router: Router,
    public userService: UserService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<PopupLoginDialogComponent>
  ) { }

  ngOnInit() {
    localStorage.clear();
    this.form = this.fb.group({
      username: ["", Validators.required],

      password: ["", Validators.required],
    });
  }

  onFilterChange(eve: any) {
    if (eve.target.checked) {
      this.isRemember = true;
    } else {
      this.isRemember = false;
    }
  }

  OnSubmit() {
    this.spinner.show();
    const username = this.form.get("username").value;
    const password = this.form.get("password").value;
    this.userService.userAuthentication(username, password).subscribe(
      (data: any) => {
        var timeexpires = new Date();
        localStorage.setItem("UserName",username);
        localStorage.setItem("userToken", data.access_token);     
        localStorage.setItem("TokenExpire", timeexpires.toLocaleString());
        localStorage.setItem("refreshToken", data.refresh_token);
        localStorage.setItem("F5TokenExpire", timeexpires.toLocaleString());
        sessionStorage.setItem("IsLogin", "true");
        this.spinner.hide();

        this.userService.getEmployeeInformation(AppSettings.GetQuerySeach(1,1,username)).subscribe((data:any)=>{
            localStorage.setItem("UserNo", data.UpdatedBy);
                this.dialogRef.close(data);
        },
        (err: HttpErrorResponse) => {
            this.isLoginError = true;
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
        )

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
