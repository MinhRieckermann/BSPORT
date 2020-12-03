import { ConfirmationDialogComponent } from "./../../home/pop-up/confirmation/confirmation.component";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { FilterModel } from "../models/FilterModel.model";
import { FilterComponent } from "../../home/pop-up/filter/filter.component";

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
}
