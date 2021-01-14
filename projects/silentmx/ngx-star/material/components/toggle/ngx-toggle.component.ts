import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: "ngx-toggle",
  templateUrl: "./ngx-toggle.component.html",
  styleUrls: ["./ngx-toggle.component.scss"],
  host: {
    "style": `
      display: inline-block;
      box-sizing: border-box;
      height: 24px;
    `,
  },
  animations: [
    trigger("toggle", [
      state(
        "active",
        style({
          transform: 'translateX(18px)'
        })
      ),
      state(
        "inactive",
        style({
          transform: 'translateX(-2px)'
        })
      ),
      transition("active => inactive", [
        animate(
          "200ms ease-out",
          style({
            transform: "translateX(-2px)"
          })
        )
      ]),
      transition("inactive => active", [
        animate(
          "200ms ease-out",
          style({
            transform: "translateX(18px)"
          }),
        )
      ]),
    ])
  ]
})
export class NgxToggleComponent {
  private theme = localStorage.getItem("ngx-theme") ?
    localStorage.getItem("ngx-theme") : "ngx-theme-default-light";

  isActive: boolean = this.theme.includes("dark");

  constructor(private render: Renderer2) {

  }

  changeState() {
    this.isActive = !this.isActive;
    this.theme = localStorage.getItem("ngx-theme") ?
      localStorage.getItem("ngx-theme") : "ngx-theme-default-light";
    if (this.isActive) {
      this.theme = this.theme.replace("light", "dark");
    } else {
      this.theme = this.theme.replace("dark", "light");
    }
    localStorage.setItem('ngx-theme', this.theme);
    this.render.setAttribute(document.body, "class", `mat-typography mat-app-background ${this.theme}`);
  }

}