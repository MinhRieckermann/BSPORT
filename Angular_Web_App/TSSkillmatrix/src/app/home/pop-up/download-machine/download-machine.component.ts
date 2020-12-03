import { HttpErrorResponse } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {MatSelectModule} from '@angular/material/select'
import { NgxSpinnerService } from "ngx-spinner";
import { AppSettings } from "../../../shared/constant/TSconstands.component";
import { Industry } from "../../../shared/models/Industry.model";
import { SkillService } from "../../../shared/services/skillservice.service";

@Component({
  selector: "app-download-machine-dialog",
  templateUrl: "./download-machine.component.html",
  styleUrls: ["./download-machine.component.css"],
})

export class DownloadMachineDialogComponent implements OnInit {
    listIndustries = new Array<Industry>()
    selected = new Industry();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<DownloadMachineDialogComponent>,
    public skillService: SkillService,
    private spinner: NgxSpinnerService,
  ) {}
  ngOnInit() {
    this.skillService
    .GetListIndustriesAll(AppSettings.GetQuerySeach(20, 1, "", 13))
    .subscribe(
      (res: any) => {
        this.listIndustries = res.objects;
        this.selected = this.listIndustries[0];
        this.spinner.hide();
      },
      (err: HttpErrorResponse) => {
        this.spinner.hide();
      }
    );
  }
  closeDialog() {
    this.dialogRef.close(false);
  }

  save(){
      this.dialogRef.close({data: this.selected})
  }
}
