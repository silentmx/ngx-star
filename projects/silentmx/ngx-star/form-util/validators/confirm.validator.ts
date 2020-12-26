import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class ConfirmErrorMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    formGroupDirective: FormGroupDirective | NgForm | null
  ): boolean {
    return control.dirty && formGroupDirective.form.hasError("confirmError");
  }
}

/**
 * 检验两个项值是否相等
 * @author silentmx
 */
export function confirmValidator(
  control1Name: string = "password",
  control2Name: string = "passwordRepeat"
): ValidatorFn {
  return (control: FormGroup): ValidationErrors | null => {
    const control1 = control.get(control1Name);
    const control2 = control.get(control2Name);
    if (control1.value === control2.value) {
      return null;
    } else {
      return { confirmError: "ConfirmationFailed" }
    }
  }
}

/**
 * 密码检测验证
 * @author silentmx
 */
@Directive({
  selector: "[confirmValidator]",
  providers: [
    { provide: NG_VALIDATORS, useExisting: ConfirmValidator, multi: true }
  ]
})
export class ConfirmValidator implements Validator {
  @Input("control1") control1: string = "password";
  @Input("control2") control2: string = "passwordRepeat";

  validate(control: AbstractControl): ValidationErrors {
    return confirmValidator(this.control1, this.control2)(control);
  }
}