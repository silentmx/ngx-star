import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmErrorMatcher } from '@silentmx/ngx-star/form-util';
@Component({
  templateUrl: "./other.component.html"
})
export class OtherComponent implements OnInit {
  textForm: FormGroup;
  errorMatcher = new ConfirmErrorMatcher(); // 自定义密码验证

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
    });
  }
}