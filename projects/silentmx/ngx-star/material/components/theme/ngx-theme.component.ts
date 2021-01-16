import { Component, Inject, Input, Renderer2 } from '@angular/core';
import { NGX_THEME_MODE } from '@silentmx/ngx-star/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: "ngx-theme",
  templateUrl: "./ngx-theme.component.html",
  styleUrls: ["./ngx-theme.component.scss"]
})
export class NgxThemeComponent {
  themeClass: string = localStorage.getItem("ngx-theme-class") ?
    localStorage.getItem("ngx-theme-class") : "ngx-theme-default";
  themeList = [
    { name: "default", color: "#3f51b5" }
  ];
  @Input("themes") set themes(themes: { name: string, color: string }[]) {
    this.themeList.push(...themes);
  }
  @Input("cols") cols: number = 4;

  constructor(
    private render: Renderer2,
    @Inject(NGX_THEME_MODE) public ngxThemeMode: BehaviorSubject<string>,
  ) {

  }

  changeTheme(name: string) {
    this.render.removeClass(document.body, `${this.themeClass}-${this.ngxThemeMode.value}`);
    this.themeClass = `ngx-theme-${name}`;
    localStorage.setItem("ngx-theme-class", this.themeClass);
    this.render.addClass(
      document.body,
      `${this.themeClass}-${this.ngxThemeMode.value}`
    );
  }
}