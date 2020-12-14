import { AnimationEvent } from '@angular/animations';
import { ComponentType } from '@angular/cdk/portal';
import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Injector,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { NgxToastAnimations } from './ngx-toast-animations';

@Component({
  templateUrl: "./ngx-toast-box.html",
  styleUrls: ["./ngx-toast-box.scss"],
  animations: [NgxToastAnimations.toastState],
  encapsulation: ViewEncapsulation.None,
  host: {
    "class": "ngx-toast-box",
    "[@state]": "animationState",
    "(@state.done)": "onAnimationEnd($event)",
  }
})
export class NgxToastBox implements OnDestroy, OnInit {
  @ViewChild("ngxToastBox", { read: ViewContainerRef, static: true }) toastBox: ViewContainerRef;

  /** Subject for notifying the user that the toast has been dismissed. */
  private readonly onExit: Subject<void> = new Subject<void>();

  /** Subject for notifying that the toast has finished entering the view. */
  private readonly onEnter: Subject<void> = new Subject<void>();

  /** The state of the toast animations. */
  animationState = "void";

  constructor(
    private ngZone: NgZone,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {

  }

  loadToast<T>(component: ComponentType<T>, injector: Injector): ComponentRef<T> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    this.toastBox.clear();
    return this.toastBox.createComponent(componentFactory, 0, injector);
  }

  onAnimationEnd($event: AnimationEvent) {
    const { fromState, toState } = $event;
    if ((toState === 'void' && fromState !== 'void') || toState === 'hidden') {
      /**
       * Waits for the zone to settle before removing the element. Helps prevent
       * errors where we end up removing an element which is in the middle of an animation.
       */
      this.ngZone.onMicrotaskEmpty.asObservable().pipe(take(1)).subscribe(() => {
        this.onExit.next();
        this.onExit.complete();
      });
    }

    if (toState === 'visible') {
      // Note: we shouldn't use `this` inside the zone callback,
      // because it can cause a memory leak.
      const onEnter = this.onEnter;
      this.ngZone.run(() => {
        onEnter.next();
        onEnter.complete();
      });
    }
  }

  ngOnInit(): void {
    this.animationState = 'visible';
  }

  ngOnDestroy() {
    this.animationState = 'hidden';
  }

  completeExit() {
    return this.onExit.asObservable();
  }

  completeEnter() {
    return this.onEnter.asObservable();
  }

}