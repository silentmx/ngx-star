import { AfterViewInit, Component, Injector } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';

@Component({
  selector: '[ngxErrorMessage]',
  template: '{{ errorMsg | ngxI18n: [labelStr, otherParams] }}'
})
export class NgxErrorMessageDirective implements AfterViewInit {
  errorMsg: string = "";
  labelStr: string = "";
  otherParams: string[] = [];
  private control: NgControl;

  constructor(
    private injector: Injector,
  ) {

  }

  ngAfterViewInit() {
    let formField = this.injector.get(MatFormField);
    this.control = formField._control.ngControl;
    if (formField._hasLabel()) {
      Promise.resolve(null).then(() => {
        this.labelStr = formField["_label"].nativeElement.firstElementChild.innerText;
      });
    }

    Promise.resolve(null).then(() => {
      this.updateError(this.control.status);
    });

    this.control.statusChanges.subscribe(this.updateError);
  }

  private updateError(state: "INVALID" | "VALID" | string) {
    if (state === "INVALID") {
      let errors = this.control.errors;
      this.otherParams = [];

      // just grab one error
      const firstError = Object.keys(errors)[0];

      if (firstError === "required") {
        this.errorMsg = "MissingRequiredField";
        return;
      }

      if (firstError === "minlength") {
        this.errorMsg = "The field {0} must be a string or array type with a minimum length of '{1}'."
        this.otherParams = [`${errors.minlength.requiredLength}`];
        return;
      }

      if (firstError === "maxlength") {
        this.errorMsg = "The field {0} must be a string with a maximum length of {1}.";
        this.otherParams = [`${errors.maxlength.requiredLength}`];
        return;
      }

      if (firstError === "email") {
        this.errorMsg = "EmailFormatErrorMessage";
        return;
      }

      if (firstError === "pattern") {
        this.errorMsg = "The field {0} must match the regular expression '{1}'.";
        return;
      }

      this.errorMsg = `${errors[firstError]}`;
    }

    if (state === "VALID") {
      this.errorMsg = "";
      this.otherParams = [];
    }
  }

}