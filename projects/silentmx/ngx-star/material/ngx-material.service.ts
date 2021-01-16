import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NGX_THEME_MODE } from '@silentmx/ngx-star/core';
import { BehaviorSubject } from 'rxjs';
import { NgxIconConfig, NGX_ICON_CONFIG } from './token';

@Injectable()
export class NgxMaterialService {
  // 初始化状态
  private static _initState: string = "";
  private renderer: Renderer2;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private rendererFactory: RendererFactory2,
    @Inject(NGX_ICON_CONFIG) private ngxIconConfig: NgxIconConfig,
    @Inject(NGX_THEME_MODE) private ngxThemeMode$: BehaviorSubject<string>,
  ) {
    if (!NgxMaterialService._initState) {
      this.renderer = this.rendererFactory.createRenderer(null, null);
      this.init();
    }
  }

  private init() {
    this.ngxIconConfig = { ...new NgxIconConfig(), ...this.ngxIconConfig };
    const head = document.getElementsByTagName("head")[0];
    // 添加默认字体
    const fontLink = document.createElement("link");
    fontLink.id = "GoogleFont";
    fontLink.rel = "stylesheet";
    fontLink.href = "https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap";
    head.appendChild(fontLink);

    // 设置主题
    let themeClass = localStorage.getItem('ngx-theme-class') ?
      localStorage.getItem('ngx-theme-class') : "ngx-theme-default";

    this.renderer.addClass(
      document.body,
      `mat-typography`
    );
    this.renderer.addClass(
      document.body,
      `mat-app-background`
    );
    this.renderer.addClass(
      document.body,
      `${themeClass}-${this.ngxThemeMode$.value}`
    );

    // 默认添加Google Materi icon
    const link = document.createElement("link");
    link.id = "MaterialIcon";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Sharp|Material+Icons+Round|Material+Icons+Two+Tone";
    head.appendChild(link);

    // 修改图标库默认fontset, 默认值material-icon
    if (this.ngxIconConfig.fontSet) {
      this.matIconRegistry.setDefaultFontSetClass(this.ngxIconConfig.fontSet);
    }

    // 添加自定义图标库
    if (this.ngxIconConfig.fontUrl) {
      const customlink = document.createElement("link");
      customlink.id = "fontIcon";
      customlink.rel = "stylesheet";
      customlink.href = this.ngxIconConfig.fontUrl;
      head.appendChild(customlink);
    }

    // 添加自定义矢量图标
    if (this.ngxIconConfig.svgIcons && this.ngxIconConfig.svgIcons.length > 0) {
      this.ngxIconConfig.svgIcons.forEach(item => {
        this.matIconRegistry.addSvgIcon(
          item.name,
          this.sanitizer.bypassSecurityTrustResourceUrl(item.url)
        );
      })
    }
    NgxMaterialService._initState = "complete";
  }
}