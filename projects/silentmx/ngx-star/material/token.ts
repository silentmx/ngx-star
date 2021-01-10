import { InjectionToken } from '@angular/core';

/**
 * 图标配置依赖注入
 * @author silentmx
 */
export const NGX_ICON_CONFIG = new InjectionToken<NgxIconConfig>("NGX_ICON_CONFIG", {
  providedIn: "root",
  factory: (): NgxIconConfig => {
    return new NgxIconConfig();
  }
})

/**
 * 图标配置类
 * @author silentmx
 */
export class NgxIconConfig {
  /**
   * 图标大小，默认20像素
   */
  size?: string | number = "20";

  /**
   * 自定义字体图标class
   */
  fontSet?: string = "iconfont";

  /**
   * 自定义字体图标url
   */
  fontUrl?: string;

  /**
   * 自定义矢量图标
   */
  svgIcons?: { name: string, url: string }[];
}