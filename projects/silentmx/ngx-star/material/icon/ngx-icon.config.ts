export class NgxIconConfig {
  /**
   * icon default size
   */
  iconSize?: string = "20";

  /**
   * regist fontIcon
   */
  fontIcon?: {
    iconCssUrl: string,
    iconClass: string,
  }

  /**
   * Svg icon list
   */
  svgIcons?: { name: string, url: string }[];
}