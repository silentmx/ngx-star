import { OverlayRef } from '@angular/cdk/overlay';
import { ComponentType } from '@angular/cdk/portal';
import {
  Component,
  ComponentFactoryResolver,
  Injector,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { NgxToastBox } from './ngx-toast-box';
import { NgxToastConfig } from './ngx-toast-config';
import { NgxToastRef } from './ngx-toast-ref';

@Component({
  templateUrl: "./ngx-toast-container.html",
  styleUrls: ["./ngx-toast-container.scss"],
  encapsulation: ViewEncapsulation.None,
  host: {
    "class": "ngx-toast-container"
  }
})
export class NgxToastContainer implements OnDestroy {
  @ViewChild(
    "ngxToastContainer",
    { read: ViewContainerRef, static: true }
  ) toastContainer: ViewContainerRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    public overlayRef: OverlayRef,
    public ngxToastConfig: NgxToastConfig,
  ) {

  }

  createToastRef<T>(component: ComponentType<T>, injector: Injector): NgxToastRef<T> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(NgxToastBox);
    const toastBoxRef = this.toastContainer.createComponent(componentFactory, 0);
    let toastRef = new NgxToastRef<T>();
    toastRef.container = toastBoxRef;
    toastRef.instance = toastBoxRef.instance.loadToast<T>(component, injector).instance;
    return toastRef;
  }

  ngOnDestroy() {
    this.overlayRef.dispose();
  }

}