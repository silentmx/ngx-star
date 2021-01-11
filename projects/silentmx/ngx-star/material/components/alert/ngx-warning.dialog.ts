import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: "./ngx-warning.dialog.html"
})
export class NgxWarningDialog implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<NgxWarningDialog>,
  ) {

  }

  ngOnInit() {
    this.dialogRef.updateSize("450px");
  }

  submit() {
    this.dialogRef.close(true);
  }
}