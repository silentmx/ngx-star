import { NgModule } from '@angular/core';
import { NgxCommonModule } from '@silentmx/ngx-star/common';
import { NgxMaterialModule } from '@silentmx/ngx-star/material';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

@NgModule({
  imports: [
    NgxCommonModule,
    NgxMaterialModule.forRoot(),
    MainRoutingModule,
  ],
  declarations: [
    MainComponent,
  ],
})
export class MainModule {

}