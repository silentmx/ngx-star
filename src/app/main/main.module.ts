import { NgModule } from '@angular/core';
import { NgxCommonModule } from '@silentmx/ngx-star/common';
import { NgxMaterialModule } from '@silentmx/ngx-star/material';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { ToastComponent } from './toast/toast.component';

@NgModule({
  imports: [
    NgxCommonModule,
    NgxMaterialModule.forRoot(),
    MainRoutingModule,
  ],
  declarations: [
    MainComponent,
    ToastComponent
  ],
})
export class MainModule {

}