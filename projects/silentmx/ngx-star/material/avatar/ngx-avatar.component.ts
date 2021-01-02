import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: "ngx-avatar",
  templateUrl: "./ngx-avatar.component.html",
  styleUrls: ["./ngx-avatar.component.scss"],
  host: {
    "style": "display: inherit;"
  }
})
export class NgxAvatarComponent {
  @Input("src") src: string;
  @Input("size") size: string | number;

  constructor(
    private sanitizer: DomSanitizer,
  ) {

  }

  getStyle() {
    return this.sanitizer.bypassSecurityTrustStyle(`
      height: ${this.size ? this.size : 40}px !important;
      width: ${this.size ? this.size : 40}px !important;
    `)
  }
}