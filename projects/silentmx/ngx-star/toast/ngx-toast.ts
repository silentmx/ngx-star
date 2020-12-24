import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ComponentType, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Inject, Injectable, InjectionToken, Injector } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { NgxToastConfig, NGX_TOAST_DATA } from './ngx-toast-config';
import { NgxToastContainer } from './ngx-toast-container';
import { NgxToastRef } from './ngx-toast-ref';
import { NgxToastModule } from './ngx-toast.module';
import { SimpleToastComponent } from './simple-toast.component';

/**
 * Injection token that can be used to specify default toast.
 */
export const NGX_TOAST_DEFAULT_CONFIG =
  new InjectionToken<NgxToastConfig>("ngx-toast-default-config", {
    providedIn: "root",
    factory: NGX_TOAST_DEFAULT_CONFIG_FACTORY,
  });

export function NGX_TOAST_DEFAULT_CONFIG_FACTORY(): NgxToastConfig {
  return new NgxToastConfig();
}


/**
 * Service to dispatch Material Design toast messages.
 */
@Injectable({
  providedIn: NgxToastModule
})
export class NgxToast {
  private static toastContainerRefs: ComponentRef<NgxToastContainer>[] = [];

  constructor(
    private overlay: Overlay,
    private injector: Injector,
    private breakpointObserver: BreakpointObserver,
    @Inject(NGX_TOAST_DEFAULT_CONFIG) private defaultConfig: NgxToastConfig,
  ) {

  }

  success(obj: { message: string, args?: string[] }, userConfig?: NgxToastConfig): NgxToastRef<SimpleToastComponent> {
    const config = { ...new NgxToastConfig(), ...this.defaultConfig, ...userConfig };
    config.data = {
      message: obj.message,
      args: obj.args,
      type: "success",
    }
    return this.openFromComponent(SimpleToastComponent, config);
  }

  info(obj: { message: string, args?: string[] }, userConfig?: NgxToastConfig): NgxToastRef<SimpleToastComponent> {
    const config = { ...new NgxToastConfig(), ...this.defaultConfig, ...userConfig };
    config.data = {
      message: obj.message,
      args: obj.args,
      type: "info",
    }
    return this.openFromComponent(SimpleToastComponent, config);
  }

  warn(obj: { message: string, args?: string[] }, userConfig?: NgxToastConfig): NgxToastRef<SimpleToastComponent> {
    const config = { ...new NgxToastConfig(), ...this.defaultConfig, ...userConfig };
    config.data = {
      message: obj.message,
      args: obj.args,
      type: "warn",
    }
    return this.openFromComponent(SimpleToastComponent, config);
  }

  error(obj: { message: string, args?: string[] }, userConfig?: NgxToastConfig): NgxToastRef<SimpleToastComponent> {
    const config = { ...new NgxToastConfig(), ...this.defaultConfig, ...userConfig };
    config.data = {
      message: obj.message,
      args: obj.args,
      type: "error",
    }
    return this.openFromComponent(SimpleToastComponent, config);
  }

  /**
   * Creates and dispatches a toast with a custom component for the content
   * @param component Component to be instantiated.
   * @param config Extra configuration for the toast.
   */
  openFromComponent<T>(component: ComponentType<T>, userConfig?: NgxToastConfig): NgxToastRef<T> {
    return this.attach(component, userConfig);
  }

  private attach<T>(component: ComponentType<T>, userConfig?: NgxToastConfig): NgxToastRef<T> {
    const config = { ...new NgxToastConfig(), ...this.defaultConfig, ...userConfig };
    let containerRef = NgxToast.toastContainerRefs.find(item => {
      return item.instance.ngxToastConfig.horizontalPosition === config.horizontalPosition &&
        item.instance.ngxToastConfig.verticalPosition === config.verticalPosition;
    });

    if (!containerRef) {
      const overlayRef = this.createOverlay(config);
      const injector = Injector.create({
        parent: this.injector,
        providers: [
          { provide: OverlayRef, useValue: overlayRef },
          { provide: NgxToastConfig, useValue: config },
        ]
      });
      containerRef = overlayRef.attach(new ComponentPortal(NgxToastContainer, null, injector));
      NgxToast.toastContainerRefs.push(containerRef);
    }
    const toastRef = containerRef.instance.createToastRef<T>(component, this.createInjector(config));

    // Subscribe to the breakpoint observer and attach the mat-toast-handset class as
    // appropriate. This class is applied to the overlay element because the overlay must expand to
    // fill the width of the screen for full width snackbars.
    this.breakpointObserver.observe(Breakpoints.HandsetPortrait).pipe(
      takeUntil(containerRef.instance.overlayRef.detachments())
    ).subscribe(state => {
      const classList = containerRef.instance.overlayRef.overlayElement.classList;
      const className = 'ngx-toast-handset';
      state.matches ? classList.add(className) : classList.remove(className);
    });

    toastRef.container.instance.completeEnter().subscribe(() => {
      toastRef.container.instance.exitByClick().subscribe(() => {
        toastRef.dismiss();
      });
      toastRef.dismissAfter(config.duration);
    });
    toastRef.container.instance.completeExit().subscribe(() => {
      if (containerRef.instance.toastContainer.length <= 0) {
        NgxToast.toastContainerRefs = NgxToast.toastContainerRefs.filter(item => {
          return item.instance.ngxToastConfig.horizontalPosition !== containerRef.instance.ngxToastConfig.horizontalPosition &&
            item.instance.ngxToastConfig.verticalPosition !== containerRef.instance.ngxToastConfig.verticalPosition;
        });
        containerRef.destroy();
      }
    })
    return toastRef;
  }

  private createOverlay(config: NgxToastConfig): OverlayRef {
    let overlayConfig = new OverlayConfig();
    let positionStrategy = this.overlay.position().global();

    // set horizontal position.
    if (config.horizontalPosition === "left" || config.horizontalPosition === "start") {
      positionStrategy.left("0");
    } else if (config.horizontalPosition === "right" || config.horizontalPosition === "end") {
      positionStrategy.right("0");
    } else {
      positionStrategy.centerHorizontally();
    }

    // set vertical position
    if (config.verticalPosition === "top") {
      positionStrategy.top("0");
    } else {
      positionStrategy.bottom("0");
    }

    overlayConfig.positionStrategy = positionStrategy;
    return this.overlay.create(overlayConfig);
  }

  private createInjector<T>(config: NgxToastConfig): Injector {
    return Injector.create({
      parent: this.injector,
      providers: [
        { provide: NGX_TOAST_DATA, useValue: config.data }
      ]
    });
  }
}