import { NgModule } from '@angular/core';
import { NgxCommonModule } from '@silentmx/ngx-star/common';
import { NgxMaterialModule } from '@silentmx/ngx-star/material';
import { MaterialRoutingModule } from './material-routing.module';

@NgModule({
  imports: [
    NgxCommonModule,
    NgxMaterialModule,
    MaterialRoutingModule
  ]
})
export class MaterialModule {

}