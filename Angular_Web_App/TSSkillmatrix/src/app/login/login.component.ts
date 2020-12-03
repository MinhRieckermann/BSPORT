import { AppSettings } from "./../shared/constant/TSconstands.component";
import { UserService } from "./../shared/services/user.service";
import { SkillService } from "./../shared/services/skillservice.service";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { timeout } from "rxjs/operators";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TechnicianService } from "../shared/services/technicianservice.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
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
    private techService: TechnicianService,
    private skillService: SkillService
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
        localStorage.setItem("UserNo", data.UserNo);
        localStorage.setItem("TokenExpire", timeexpires.toLocaleString());
        localStorage.setItem("refreshToken", data.refresh_token);
        localStorage.setItem("F5TokenExpire", timeexpires.toLocaleString());
        sessionStorage.setItem("IsLogin", "true");
        this.router.navigate(["/home"]);
        // this.skillService.CheckInformationOfAccount(AppSettings.GetQuerySeach(1,1,username)).subscribe((number:any) => {        
        //   if(number == 0){
        //     this.router.navigate(["/register"]);
        //   }
          
        //   if(number > 0){
        //     this.router.navigate(["/reg-detail",number])
        //   }

        //   if (number < 0){
        //     this.router.navigate(["/home"]);
        //     this.router.events.subscribe((e) => {
        //       if (e instanceof NavigationEnd) {
        //       }
        //       console.log(e);
        //     });
        //   }
        // },(err:HttpErrorResponse)=>{
        //   this.spinner.hide();
        // })
        this.spinner.hide();
        
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
