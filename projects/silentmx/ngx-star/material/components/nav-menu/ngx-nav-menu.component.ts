import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';
import { collapseAnimation, rotateAnimation } from '@silentmx/ngx-star/animatios';
import { NgxMenu, NgxMenusService } from '@silentmx/ngx-star/common';

@Component({
  selector: "ngx-nav-menu",
  templateUrl: "./ngx-nav-menu.component.html",
  styleUrls: ["./ngx-nav-menu.component.scss"],
  animations: [
    rotateAnimation(),
    rotateAnimation({
      rotate: "180"
    }),
    collapseAnimation(),
  ]
})
export class NgxNavMenuComponent implements OnInit {
  // 菜单状态
  expand: boolean = localStorage.getItem("ngx-menu-expand") ?
    localStorage.getItem("ngx-menu-expand") == "true" : false;
  nowDate: Date = new Date();

  @Input("copyRight") copyRight: string;

  treeControl = new NestedTreeControl<NgxMenu>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<NgxMenu>();

  constructor(
    public router: Router,
    private ngxMenusService: NgxMenusService
  ) {

  }

  ngOnInit() {
    this.dataSource._data = this.ngxMenusService.ngxMenus$;
  }

  hasChild = (_: number, node: NgxMenu) => {
    if (!!node.children && node.children.length > 0) {
      if (this.router.isActive(node.url, false)) {
        this.treeControl.expand(node);
      }
      return true;
    } else {
      return false;
    }
  };

  // 菜单状态切换
  toggle() {
    this.expand = !this.expand;
    localStorage.setItem("ngx-menu-expand", `${this.expand}`);
  }

}