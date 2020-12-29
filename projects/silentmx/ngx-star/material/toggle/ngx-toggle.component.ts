import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: "ngx-toggle",
  templateUrl: "./ngx-toggle.component.html",
  styleUrls: ["./ngx-toggle.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxToggleComponent),
      multi: true,
    }
  ],
  animations: [
    trigger("toggle", [
      state(
        "active",
        style({
          transform: 'translateX(18px)'
        })
      ),
      state(
        "inactive",
        style({
          transform: 'translateX(-2px)'
        })
      ),
      transition("active => inactive", [
        animate(
          "200ms ease-out",
          style({
            transform: "translateX(-2px)"
          })
        )
      ]),
      transition("inactive => active", [
        animate(
          "200ms ease-out",
          style({
            transform: "translateX(18px)"
          }),
        )
      ]),
    ])
  ]
})
export class NgxToggleComponent implements ControlValueAccessor, OnDestroy {
  change: Subject<boolean> = new Subject<boolean>();
  isActive: boolean = false;

  onChange: any = () => { };
  onTouch: any = () => { };

  ngOnDestroy() {
    this.change.complete();
  }

  changeState() {
    this.isActive = !this.isActive;
    this.onChange(this.isActive);
    this.onTouch(this.isActive);
    this.change.next(this.isActive);
  }

  writeValue(active: boolean | undefined | null): void {
    if (active) {
      this.isActive = active;
    } else {
      this.isActive = false;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
  }

}