import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxWarningDialog } from '@silentmx/ngx-star/material';

@Component({
  templateUrl: "./dialog.component.html"
})
export class DialogComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) {

  }

  ngOnInit() {

  }

  openWarnDialog(message: string) {
    const dialogRef = this.dialog.open(
      NgxWarningDialog,
      {
        data: {
          message: message
        }
      }
    );

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    })
  }
}