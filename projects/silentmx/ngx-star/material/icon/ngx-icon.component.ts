import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxIconConfig } from './ngx-icon.config';

@Component({
  selector: "ngx-icon",
  templateUrl: "./ngx-icon.component.html",
  host: {
    "style": "getStyle()",
  }
})
export class NgxIconComponent {
  @Input("fontIcon") fontIcon: string;
  @Input("svgIcon") svgIcon: string;
  @Input("size") size: string | number;
  @Input("color") color: string;

  constructor(
    private config: NgxIconConfig,
    private sanitizer: DomSanitizer,
  ) {

  }

  getStyle() {
    return this.sanitizer.bypassSecurityTrustStyle(`
      display: inline-block;
      line-height: ${this.size ? this.size : this.config.iconSize}px !important;
      height: ${this.size ? this.size : this.config.iconSize}px !important;
      width: ${this.size ? this.size : this.config.iconSize}px !important;
      font-size: ${this.size ? this.size : this.config.iconSize}px !important;
      color: ${this.getColor()} !important;
    `)
  }

  getDefaultColor() {
    if (["primary", "accent", "warn"].includes(this.color)) {
      return this.color;
    }

    return "";
  }

  private getColor() {
    if (["primary", "accent", "warn"].includes(this.color)) {
      return "";
    }

    return this.color;
  }

}