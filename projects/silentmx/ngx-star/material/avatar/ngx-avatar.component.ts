import { Component, Input } from '@angular/core';

@Component({
  selector: "ngx-avatar",
  templateUrl: "./ngx-avatar.component.html",
  styleUrls: ["./ngx-avatar.component.scss"],
  host: {
    "style": `
      display: inline-block;
      box-sizing: border-box;
    `,
    "[style]": "getStyle()"
  }
})
export class NgxAvatarComponent {
  @Input("src") src: string;
  @Input("size") size: string | number = "40";

  getStyle() {
    return {
      "height": `${this.size}px`,
      "width": `${this.size}px`,
    }
  }
}