import { NgModule } from '@angular/core';
import { NgxMaterialModule } from '@silentmx/ngx-star/material';
import { OtherRoutingModule } from './other-routing.module';
import { OtherComponent } from './other.component';

@NgModule({
  imports: [
    NgxMaterialModule,
    OtherRoutingModule
  ],
  declarations: [
    OtherComponent
  ]
})
export class OtherModule {

}