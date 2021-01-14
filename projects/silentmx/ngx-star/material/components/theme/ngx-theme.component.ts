import { Component, Input, Renderer2 } from '@angular/core';

@Component({
  selector: "ngx-theme",
  templateUrl: "./ngx-theme.component.html",
  styleUrls: ["./ngx-theme.component.scss"]
})
export class NgxThemeComponent {
  private themeClass: string = localStorage.getItem("ngx-theme") ?
    localStorage.getItem("ngx-theme") : "ngx-theme-default-light";
  currentTheme: string = this.themeClass.split("-")[2];
  themeList = [
    { name: "default", color: "#3f51b5" }
  ];

  @Input("themes") set themes(themes: { name: string, color: string }[]) {
    this.themeList.push(...themes);
  }
  @Input("cols") cols: number = 4;

  constructor(private render: Renderer2) {

  }

  changeTheme(name: string) {
    this.themeClass = localStorage.getItem("ngx-theme") ?
      localStorage.getItem("ngx-theme") : "ngx-theme-default-light";
    let themeMode = this.themeClass.includes("dark") ? "dark" : "light";
    let theme = `ngx-theme-${name}-${themeMode}`;
    this.render.setAttribute(document.body, "class", `mat-typography ${theme}`);
    localStorage.setItem("ngx-theme", theme);
    this.currentTheme = name;
  }
}