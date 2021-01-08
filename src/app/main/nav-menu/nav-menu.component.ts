import { Component, OnInit } from '@angular/core';
import { NgxMenusService, NgxSecurityService } from '@silentmx/ngx-star/common';

@Component({
  selector: "nav-menu",
  templateUrl: "./nav-menu.component.html",
})
export class NavMenuComponent implements OnInit {

  constructor(
    private ngxMenuService: NgxMenusService,
    private ngxSecurityService: NgxSecurityService
  ) {

  }

  ngOnInit() {
    this.ngxMenuService.ngxMenus$.subscribe(data => {
      console.log(data);
    })
  }

  changeSecurity() {
    this.ngxSecurityService.updateDataSource({
      button: true
    })
  }
}