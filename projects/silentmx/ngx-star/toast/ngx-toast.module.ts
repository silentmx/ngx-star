import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { NgxCommonModule } from '@silentmx/ngx-star/common';
import { NgxToastBox } from './ngx-toast-box';
import { NgxToastContainer } from './ngx-toast-container';
import { SimpleToastComponent } from './simple-toast.component';

/**
 * Toast module
 * @author silentmx
 */
@NgModule({
  imports: [
    OverlayModule,
    NgxCommonModule,
  ],
  declarations: [
    NgxToastContainer,
    NgxToastBox,
    SimpleToastComponent
  ]
})
export class NgxToastModule {
  
}