import { SkillService } from "./../shared/services/skillservice.service";
import { OnInit, Component } from "@angular/core";
import { Router } from "@angular/router";
import { TechnicianService } from "../shared/services/technicianservice.service";
import { AppSettings } from "../shared/constant/TSconstands.component";
import { NgxSpinnerService } from "ngx-spinner";
import { User } from "../shared/models/user.model";
import { HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map, shareReplay } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  userName: string;
  userClaims: User;
  canEdit: boolean = false;
  registerCount = 0;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    public skillService: SkillService,
    private technicianService: TechnicianService,
    private breakpointObserver: BreakpointObserver
  ) {}
  ngOnInit() {
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
     this.technicianService.CountRegisterForm().subscribe(
      (data: number) => {
        this.registerCount = data;
        this.spinner.hide();
      },
      (err: HttpErrorResponse) => {
        this.spinner.hide();
      }
    ); 

  }

  Logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(["/login"]);
  }
}
