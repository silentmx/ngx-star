import { InjectionToken } from '@angular/core';

/**
 * Injection token that can be used to access data that was passed in to toast.
 */
export const NGX_TOAST_DATA = new InjectionToken<any>("NgxToastData");

/**
 * Possible values for horizontalPosition on NgxToastContainerConfig.
 */
export type NgxToastHorizontalPosition = "start" | "center" | "end" | "left" | "right";

/**
 * Possible values for verticalPosition on NgxToastContainerConfig.
 */
export type NgxToastVerticalPostion = "top" | "bottom";

/**
 * Configuration for opening ngx toast.
 */
export class NgxToastConfig<D = any> {
  /**
   * The length of time in millinseconds to wait before automatically dismissing the toast.
   */
  duration?: number = 0;

  /**
   * Data being injected into the child component.
   */
  data?: D | null = null;

  /**
   * The horizontal position to place the toast container.
   */
  horizontalPosition?: NgxToastHorizontalPosition = "right";

  /**
   * The vertical postion to place the toast container.
   */
  verticalPosition?: NgxToastVerticalPostion = "top";
}