import { ComponentRef } from '@angular/core';
import { NgxToastBox } from './ngx-toast-box';

/**
 * Maximum amount of milliseconds that can be passed into setTimeout
 */
const MAX_TIMEOUT = Math.pow(2, 31) - 1;

/**
 * Reference to a toast dispatched from the toast service
 * @author silentmx
 */
export class NgxToastRef<T> {
  instance: T;

  container: ComponentRef<NgxToastBox>;

  /**
   * Timeout ID for the duration setTimeout call. Used to clear the timeout if the toast is.
   */
  private durationTimeoutId: any;

  /**
   * Dismisses the toast after some duration
   */
  dismissAfter(duration: number): void {
    if (duration && duration > 0) {
      this.durationTimeoutId = setTimeout(() => this.dismiss(), Math.min(duration, MAX_TIMEOUT));
    }
  }

  dismiss(): void {
    this.container.destroy();
    clearTimeout(this.durationTimeoutId);
  }

}