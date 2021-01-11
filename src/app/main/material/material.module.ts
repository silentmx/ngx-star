import { NgModule } from '@angular/core';
import { NgxCommonModule } from '@silentmx/ngx-star/common';
import { NgxMaterialModule } from '@silentmx/ngx-star/material';
import { ButtonComponent } from './button/button.component';
import { DialogComponent } from './dialog/dialog.component';
import { MaterialRoutingModule } from './material-routing.module';

@NgModule({
  imports: [
    NgxCommonModule,
    NgxMaterialModule,
    MaterialRoutingModule
  ],
  declarations: [
    ButtonComponent,
    DialogComponent
  ]
})
export class MaterialModule {

}