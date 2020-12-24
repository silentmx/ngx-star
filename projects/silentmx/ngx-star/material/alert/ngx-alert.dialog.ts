import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: "./ngx-alert.dialog.html"
})
export class NgxAlertDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      message: string,
      args?: string[],
      icon?: string,
      iconColor?: string,
    },
    private dialogRef: MatDialogRef<NgxAlertDialog>,
  ) {

  }

  submit() {
    this.dialogRef.close(true);
  }
}