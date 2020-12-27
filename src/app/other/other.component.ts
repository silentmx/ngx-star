import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxConfirmErrorMatcher, ngxConfirmValidator } from '@silentmx/ngx-star/form-util';
@Component({
  templateUrl: "./other.component.html"
})
export class OtherComponent implements OnInit {
  textForm: FormGroup;
  errorMatcher = new NgxConfirmErrorMatcher(); // 自定义密码验证
  hero = {
    name: "silentmx"
  };

  constructor(
    private fb: FormBuilder,
  ) {

  }

  ngOnInit() {
    this.textForm = this.fb.group({
      password: ["", {
        validators: [Validators.required]
      }],
      passwordRepeat: ["", {
        validators: [Validators.required]
      }]
    }, {
      validators: [ngxConfirmValidator()]
    });
  }
}