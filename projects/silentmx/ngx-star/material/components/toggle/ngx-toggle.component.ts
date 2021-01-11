import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, Renderer2 } from '@angular/core';

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
export class NgxToggleComponent implements OnInit {
  @Input("theme") theme: string = "admin-dark-theme";
  isActive: boolean = localStorage.getItem('ngx-theme') == "dark" ? true : false;;

  constructor(private render: Renderer2) {

  }

  ngOnInit() {
    if (this.isActive) {
      this.render.addClass(document.body, this.theme);
    }
  }

  changeState() {
    this.isActive = !this.isActive;
    if (this.isActive) {
      localStorage.setItem('ngx-theme', 'dark');
      this.render.addClass(document.body, this.theme);
    } else {
      localStorage.setItem('ngx-theme', 'light');
      this.render.removeClass(document.body, this.theme);
    }
  }

}