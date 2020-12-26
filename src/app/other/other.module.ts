import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxFormUtilModule } from '@silentmx/ngx-star/form-util';
import { NgxLocaleModule } from '@silentmx/ngx-star/locale';
import { NgxMaterialModule } from '@silentmx/ngx-star/material';
import { OtherRoutingModule } from './other-routing.module';
import { OtherComponent } from './other.component';

@NgModule({
  imports: [
    NgxLocaleModule,
    NgxMaterialModule,
    ReactiveFormsModule,
    // FormsModule,
    NgxFormUtilModule,
    OtherRoutingModule
  ],
  declarations: [
    OtherComponent
  ]
})
export class OtherModule {

}