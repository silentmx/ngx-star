import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Inject, Renderer2 } from '@angular/core';
import { NGX_THEME_MODE } from '@silentmx/ngx-star/core';
import { BehaviorSubject } from 'rxjs';

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

  constructor(
    private render: Renderer2,
    @Inject(NGX_THEME_MODE) public ngxThemeMode: BehaviorSubject<string>,
  ) {

  }

  changeState() {
    let themeClass = localStorage.getItem("ngx-theme-class") ?
      localStorage.getItem("ngx-theme-class") : "ngx-theme-default";
    this.render.removeClass(document.body, `${themeClass}-${this.ngxThemeMode.value}`);
    if (this.ngxThemeMode.value == "dark") {
      this.ngxThemeMode.next("light");
    } else {
      this.ngxThemeMode.next("dark");
    }
    localStorage.setItem("ngx_theme_mode", this.ngxThemeMode.value);
    this.render.addClass(
      document.body,
      `${themeClass}-${this.ngxThemeMode.value}`
    );
  }

}