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
  selector: `
    [mat-button][ngxLoading], [mat-flat-button][ngxLoading],
    [mat-icon-button][ngxLoading], [mat-raised-button][ngxLoading],
    [mat-stroked-button][ngxLoading], [mat-mini-fab][ngxLoading],
    [mat-fab][ngxLoading]
  `,
})
export class NgxLoadingDirective {
  @Input('ngxLoading') set ngxLoading(loading: boolean) {
    if (loading) {
      const spinerFactory = this.componentFactoryResolver.resolveComponentFactory(MatSpinner);
      const spinner = this.viewContainerRef.createComponent(spinerFactory).instance;
      spinner.diameter = 20;
      if (this.elementRef.nativeElement.attributes.color?.value == "primary") {
        spinner.color = "accent";
      } else {
        spinner.color = "primary";
      }
      const spinnerElement = spinner._elementRef.nativeElement;

      const targetElement = this.elementRef.nativeElement.firstElementChild;
      this.renderer.setStyle(targetElement, "display", "flex");
      this.renderer.setStyle(targetElement, "align-items", "center");
      this.renderer.setStyle(targetElement, "justify-content", "center");
      this.renderer.setStyle(targetElement, "box-sizing", "border-box");

      if (
        this.elementRef.nativeElement.attributes["mat-icon-button"] ||
        this.elementRef.nativeElement.attributes["mat-fab"] ||
        this.elementRef.nativeElement.attributes["mat-mini-fab"]
      ) {
        this.renderer.setStyle(targetElement.firstElementChild, "display", "none");
      } else {
        this.renderer.setStyle(spinnerElement, "margin-right", "5px");
      }

      this.renderer.insertBefore(
        targetElement,
        spinnerElement,
        targetElement.firstChild
      );
      this.elementRef.nativeElement.disabled = true;
    } else {
      const targetElement = this.elementRef.nativeElement.firstElementChild;
      const removeElement = targetElement.querySelector(".mat-spinner");
      if (removeElement) {
        this.renderer.removeChild(targetElement, removeElement);
        this.renderer.removeStyle(targetElement.lastElementChild, "display");
        this.elementRef.nativeElement.disabled = false;
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