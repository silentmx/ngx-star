import { InjectionToken } from '@angular/core';

/**
 * 图表配置依赖注入
 * @author silentmx
 */
export const NGX_ECHART_CONFIG = new InjectionToken<NgxEchartConfig>("NGX_ECHART_CONFIG", {
  providedIn: "root",
  factory: (): NgxEchartConfig => {
    return new NgxEchartConfig();
  }
});

/**
 * 图表配置
 */
export class NgxEchartConfig {
  /**
   * 标题
   */
  title?: NgxEchartTitleConfig = new NgxEchartTitleConfig();

  /**
   * 图例配置
   */
  legend?: NgxEchartLegendConfig = new NgxEchartLegendConfig();

  /**
   * 提示组件配置
   */
  tooltip?: NgxEchartTooltipConfit = new NgxEchartTooltipConfit();
}

/**
 * Title属性
 */
export class NgxEchartTitleConfig {
  /**
   * 是否显示标题，默认显示
   */
  show?: boolean = true;

  /**
   * 标题在容器中距离左边的距离， 默认20px
   */
  left?: string = "20px";

  /**
   * 标题距离容器上边的距离，默认20px
   */
  top?: string = "10px";
}

/**
 * 图例组件配置
 */
export class NgxEchartLegendConfig {
  /**
   * 'plain'：普通图例。缺省就是普通图例。
   * 'scroll'：可滚动翻页的图例。当图例数量较多时可以使用。
   * 当使用 'scroll' 时，使用这些设置进行细节配置：
   * scrollDataIndex
   * pageButtonItemGap
   * pageButtonGap
   * pageButtonPosition
   * pageFormatter
   * pageIcons
   * pageIconColor
   * pageIconInactiveColor
   * pageIconSize
   * pageTextStyle
   * animation
   * animationDurationUpdate
   */
  type?: "plain" | "scroll" = "plain";

  /**
   * 是否显示
   */
  show?: boolean = true;

  /**
   * 图例列表的布局朝向。
   * 'horizontal': 水平朝向
   * 'vertical': 垂直朝向
   */
  orient?: "horizontal" | "vertical" = "vertical";

  /**
   * 图例组件离容器上侧的距离。
   */
  top?: string | "top" | "middle" | "bottom" = "20px";

  /**
   * 图例组件离容器右侧的距离。
   */
  right?: string = "20px";
}

/**
 * 提示组件配置
 */
export class NgxEchartTooltipConfit {
  /**
   * 是否显示
   */
  show?: boolean = true;
}
