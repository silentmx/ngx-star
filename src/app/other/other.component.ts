import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxAlertDialog } from '@silentmx/ngx-star/material';

@Component({
  templateUrl: "./other.component.html"
})
export class OtherComponent {

  constructor(
    private dialog: MatDialog,
  ) {

  }

  // 删除语言
  openDeleteDialog() {
    const dialogRef = this.dialog.open(NgxAlertDialog, {
      width: "400px",
      data: {
        message: "LanguageDeletionConfirmationMessage",
        args: ["简体中文"],
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }



}