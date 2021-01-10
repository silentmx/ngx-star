import { NgModule } from '@angular/core';
import { NgxCommonModule } from '@silentmx/ngx-star/common';
import { CommRoutingModule } from './comm-routing.module';
import { SecurityComponent } from './security/security.component';

@NgModule({
  imports: [
    NgxCommonModule,
    CommRoutingModule,
  ],
  declarations: [
    SecurityComponent
  ]
})
export class CommModule {

}