import { HttpErrorResponse } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from "@angular/forms";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { ErrorStateMatcher } from "@angular/material/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NgxSpinnerService } from "ngx-spinner";
import { AppSettings } from "../../../shared/constant/TSconstands.component";
import { Industry } from "../../../shared/models/Industry.model";
import { ProfessionalSkill } from "../../../shared/models/ProfessionalSkill.model";
import { Stationed } from "../../../shared/models/Stationed.model";
import { Technician } from "../../../shared/models/technician.model";
import { SkillService } from "../../../shared/services/skillservice.service";
import { TechnicianService } from "../../../shared/services/technicianservice.service";
import { MachineSkillAssign } from "../../../shared/ViewModels/MachineSKillAssign.model";
@Component({
  selector: "app-add-proskill",
  templateUrl: "./add-proskill.component.html",
  styleUrls: ["./add-proskill.component.css"],
})
export class AddProSKillDialogComponent implements OnInit {
  matcher = new MyErrorStateMatcher();

  technician = new Technician();
  listStationed = new Array<Stationed>();
  listIndustries = new Array<Industry>();
  firstFormGroup: FormGroup;
  listProskill = new Array<ProfessionalSkill>();
  userName: string;
  selectedValue: number;
  selectedInd: number = 0;
  filterValue: string;
  isFitler: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<AddProSKillDialogComponent>,
    private _formBuilder: FormBuilder,
    public skillService: SkillService,
    private techService: TechnicianService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit() {
    this.technician = this.data.technician;

    this.firstFormGroup = this._formBuilder.group({
      Country: ["", Validators.required],
      Industry: ["", Validators.required],
      Email: [this.technician.EmailAddress, Validators.required],
      FullName: [this.technician.DisplayName, Validators.required],
      Title: [this.technician.Title, Validators.required],
      Remark: ["N/A", Validators.required],
    });
    this.technician.IndustryId = 0;
    this.technician.Professionals = new Array<ProfessionalSkill>();
    this.technician.ProSkill = 0;

    this.userName = localStorage.getItem("UserName");
    this.skillService
      .GetListProskill(AppSettings.GetQuerySeach(10, 1, "", 13))
      .subscribe(
        (data: any) => {
          this.listProskill = data.objects;
        },
        (err: HttpErrorResponse) => {}
      );

    this.techService
      .GetListStationedEngineer(
        AppSettings.GetQuerySeach(50, 1, this.userName, 13)
      )
      .subscribe(
        (data: any) => {
          this.listStationed = data.objects;
        },
        (err: HttpErrorResponse) => {
          this.spinner.hide();
        }
      );

    this.skillService
      .GetListIndustries(AppSettings.GetQuerySeach(10, 1, "", 13))
      .subscribe(
        (data: any) => {
          this.listIndustries = data.objects;
          this.technician.IndustryId = this.listIndustries[0].IndId;
          this.spinner.hide();
        },
        (err: HttpErrorResponse) => {
          this.spinner.hide();
        }
      );
  }

  changeProfessionalSkillLevel(event: MatCheckboxChange): void {
    let number = parseInt(event.source.value);
    let proskill = this.listProskill.filter((x) => x.SkillId == number)[0];

    if (event.checked) {
      this.technician.Professionals.push(proskill);
      this.technician.ProSkill = this.technician.ProSkill + number;
    } else {
      this.technician.ProSkill = this.technician.ProSkill - number;
      this.technician.Professionals.splice(
        this.technician.Professionals.indexOf(proskill, 1)
      );
    }
  }

  save() {
    this.AddBasicInformation();
    this.dialogRef.close(this.technician);
  }

  AddBasicInformation() {
    this.technician.Title = this.firstFormGroup.get("Title").value;
    this.technician.Remark = this.firstFormGroup.get("Remark").value;
    this.technician.StationId = this.selectedValue;
    this.technician.StationName = this.listStationed.filter(
      (x) => x.StationId == this.selectedValue
    )[0].StationName;
    this.technician.Deactive = false;
    this.technician.listAssign = new Array<MachineSkillAssign>();
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.untouched || control.touched)
    );
  }
}
