import { TechnicianService } from "./../../shared/services/technicianservice.service";
import { User } from "./../../shared/models/user.model";
import { Router } from "@angular/router";
import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Industry } from "../../shared/models/Industry.model";
import { SkillService } from "../../shared/services/skillservice.service";
import { AppSettings } from "../../shared/constant/TSconstands.component";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  listIndustries: Array<Industry>;
  userClaims: User;
  userName: string;
  canEdit: boolean = false;
  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    public skillService: SkillService,
    public technicianService: TechnicianService
  ) {}
  ngOnInit() {
    this.spinner.show();
    this.listIndustries = new Array<Industry>();

    this.skillService
      .GetListIndustries(AppSettings.GetQuerySeach(10, 1, "", 13))
      .subscribe(
        (data: any) => {
          this.listIndustries = data.objects;
          this.spinner.hide();
        },
        (err: HttpErrorResponse) => {
          this.spinner.hide();
        }
      );

    this.userClaims = new User();
    this.technicianService.getUserClaims().subscribe((data: User) => {
      this.userClaims = data;
      localStorage.setItem("UserNo", this.userClaims.UserId.toString());
      localStorage.setItem("UserName", this.userClaims.UserName);

      this.userName = localStorage.getItem("UserName");

      this.skillService
        .CheckPermission(AppSettings.GetQuerySeach(10, 1, this.userName, 13))
        .subscribe(
          (data: any) => {
            this.canEdit = data;
            this.spinner.hide();
          },
          (err: HttpErrorResponse) => {
            this.spinner.hide();
          }
        );
    });
  }
}
