import { NgModule } from '@angular/core';
import { NgxCommonModule } from '@silentmx/ngx-star/common';
import { NgxMaterialModule } from '@silentmx/ngx-star/material';
import { CommRoutingModule } from './comm-routing.module';
import { SecurityComponent } from './security/security.component';

@NgModule({
  imports: [
    NgxCommonModule,
    NgxMaterialModule,
    CommRoutingModule,
  ],
  declarations: [
    SecurityComponent
  ]
})
export class CommModule {

}