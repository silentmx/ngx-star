import { ComponentFactoryResolver, Directive, ElementRef, Input, Renderer2, ViewContainerRef } from '@angular/core';
import { MatSpinner } from '@angular/material/progress-spinner';

/**
 * Angular material button loading directive
 * @author silentmx
 * @Use 
 * 
 * <button mat-raised-button color="accent" [ngxLoading]="true">
 *   button
 * </button>
 */
@Directive({
  selector: "button[ngxLoading]",
})
export class NgxLoadingDirective {
  @Input('ngxLoading') set ngxLoading(loading: boolean) {
    if (loading) {
      const spinerFactory = this.componentFactoryResolver.resolveComponentFactory(MatSpinner);
      const spinner = this.viewContainerRef.createComponent(spinerFactory).instance;
      spinner.diameter = 20;
      const spinnerElement = spinner._elementRef.nativeElement;
      this.renderer.setStyle(spinnerElement, "margin-right", "5px");

      const targetElement = this.elementRef.nativeElement.firstElementChild;
      this.renderer.setStyle(targetElement, "display", "flex");
      this.renderer.setStyle(targetElement, "align-items", "center");
      this.renderer.setStyle(targetElement, "justify-content", "center");
      this.renderer.setStyle(targetElement, "box-sizing", "border-box");

      this.renderer.insertBefore(
        targetElement,
        spinnerElement,
        targetElement.firstChild
      );
    } else {
      const targetElement = this.elementRef.nativeElement.firstElementChild;
      const removeElement = targetElement.querySelector(".mat-spinner");
      if (removeElement) {
        this.renderer.removeChild(targetElement, removeElement);
      }
    }
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }
}