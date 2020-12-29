import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { NgxIconConfig } from './ngx-icon.config';

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
    private config: NgxIconConfig,
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {

  }

  ngOnInit() {
    this.renderer.setStyle(this.elementRef.nativeElement, "color", `${this.color}`);
    if (this.size) {
      this.renderer.setStyle(this.elementRef.nativeElement, "line-height", `${this.size}px`);
      this.renderer.setStyle(this.elementRef.nativeElement, "height", `${this.size}px`);
      this.renderer.setStyle(this.elementRef.nativeElement, "width", `${this.size}px`);
      this.renderer.setStyle(this.elementRef.nativeElement, "font-size", `${this.size}px`);
    } else {
      this.renderer.setStyle(this.elementRef.nativeElement, "line-height", `${this.config.iconSize}px`);
      this.renderer.setStyle(this.elementRef.nativeElement, "height", `${this.config.iconSize}px`);
      this.renderer.setStyle(this.elementRef.nativeElement, "width", `${this.config.iconSize}px`);
      this.renderer.setStyle(this.elementRef.nativeElement, "font-size", `${this.config.iconSize}px`);
    }
  }
}