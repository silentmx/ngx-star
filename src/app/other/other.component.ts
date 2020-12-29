import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { rotateAnimation } from '@silentmx/ngx-star/animatios';
import { NgxConfirmErrorMatcher, ngxConfirmValidator } from '@silentmx/ngx-star/form-util';
@Component({
  templateUrl: "./other.component.html",
  animations: [
    rotateAnimation({
      time: 300
    })
  ]
})
export class OtherComponent {
  textForm: FormGroup;
  errorMatcher = new NgxConfirmErrorMatcher(); // 自定义密码验证

  constructor(
    private fb: FormBuilder,
  ) {

  }

  ngOnInit() {
    this.textForm = this.fb.group({
      password: ["", {
        validators: [Validators.required, Validators.minLength(6), Validators.maxLength(10)]
      }],
      passwordRepeat: ["", {
        validators: [Validators.required]
      }]
    }, {
      validators: [ngxConfirmValidator()]
    });
  }
}