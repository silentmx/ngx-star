import { Directive, ElementRef, Inject, Input, OnInit, Renderer2 } from '@angular/core';
import { NgxIconConfig, NGX_ICON_CONFIG } from '../token';

/**
 * Angular material icon expand directive set color and size
 * @author silentmx
 */
@Directive({
  selector: "mat-icon[size], mat-icon[color], mat-icon",
})
export class NgxIconDirective implements OnInit {
  @Input("size") size: number | string;
  @Input("color") color: string;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(NGX_ICON_CONFIG) private ngxIconConfig: NgxIconConfig,
  ) {
    this.ngxIconConfig = { ...new NgxIconConfig(), ...this.ngxIconConfig }
  }

  ngOnInit() {
    let size = this.size ? this.size : this.ngxIconConfig.size;
    this.renderer.setStyle(this.elementRef.nativeElement, "color", `${this.color}`);
    this.renderer.setStyle(this.elementRef.nativeElement, "line-height", `${size}px`);
    this.renderer.setStyle(this.elementRef.nativeElement, "height", `${size}px`);
    this.renderer.setStyle(this.elementRef.nativeElement, "width", `${size}px`);
    this.renderer.setStyle(this.elementRef.nativeElement, "font-size", `${size}px`);
  }
}