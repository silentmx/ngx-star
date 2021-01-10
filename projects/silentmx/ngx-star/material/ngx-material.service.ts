import { Inject, Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxIconConfig, NGX_ICON_CONFIG } from './token';

@Injectable()
export class NgxMaterialService {
  // 初始化状态
  private static _initState: string = "";

  constructor(
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    @Inject(NGX_ICON_CONFIG) private ngxIconConfig: NgxIconConfig,
  ) {
    if (!NgxMaterialService._initState) {
      this.init();
    }
  }

  private init() {
    this.ngxIconConfig = { ...new NgxIconConfig(), ...this.ngxIconConfig };
    const head = document.getElementsByTagName("head")[0];

    // 默认添加Google Materi icon
    const link = document.createElement("link");
    link.id = "MaterialIcon";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
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