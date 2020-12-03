import { AddProSKillDialogComponent } from './../../home/pop-up/add-proskill/add-proskill.component';
import { Technician } from './../models/technician.model';
import { FilterMakerComponent } from "./../../home/pop-up/filter-maker/filter-maker.component";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "./../../home/pop-up/confirmation/confirmation.component";
import { Injectable } from "@angular/core";

import { FilterModel } from "../models/FilterModel.model";
import { FilterComponent } from "../../home/pop-up/filter/filter.component";
import { DownloadMachineDialogComponent } from "../../home/pop-up/download-machine/download-machine.component";
import { PopupLoginDialogComponent } from "../../login/login-popup/popup.component";
import { UpdateRegisterDetailComponent } from "../../home/pop-up/update-regdetail/update-regdetail.component";

@Injectable({
  providedIn: "root",
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openConfirmDialog(msg) {
    return this.dialog.open(ConfirmationDialogComponent, {
      width: "390px",
      disableClose: true,
      data: {
        message: msg,
      },
    });
  }

  openDownloadMachineDialog() {
    return this.dialog.open(DownloadMachineDialogComponent, {
      width: "390px",
      disableClose: true,
    });
  }

  openUpdateRegDigalog(username,updatedBy){
    return this.dialog.open(UpdateRegisterDetailComponent, {
      disableClose: true,
      data: {
        username : username,
        updatedBy : updatedBy
      }
    })
    
  }

  openAddSkillDialog(data : any) {
    return this.dialog.open(AddProSKillDialogComponent, {
      width: "500px",
      position: {
        top: "100px",
      },
      data : {
        technician : data
      },
      disableClose: true,
    });
  }
  openPopupLogin(){
    return this.dialog.open(PopupLoginDialogComponent, {
      width: "500px",
      position: {
        top: "150px",
      },
      disableClose: true,
    });
  }
  openDiagnosedDialog(filter: FilterModel) {
    return this.dialog.open(FilterComponent, {
      width: "550px",
      disableClose: true,
      position: {
        top: "100px",
      },
      data: {
        model: filter,
      },
    });
  }

  openFilterMachineMakerDialog(filter: FilterModel) {
    return this.dialog.open(FilterMakerComponent, {
      width: "550px",
      disableClose: true,
      position: {
        top: "100px",
      },
      data: {
        model: filter,
      },
    });
  }
}
