import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-confirmation-dialog",
  templateUrl: "./confirmation.component.html",
  styleUrls: ["./confirmation.component.css"],
})
export class ConfirmationDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>
  ) {}
  ngOnInit() {}

  closeDialog() {
    this.dialogRef.close(false);
  }
}
