import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
    BrowserAnimationsModule,
  ],
  exports: [
    BrowserAnimationsModule,
  ],
  declarations: [
    NgxToastContainer,
    NgxToastBox,
    SimpleToastComponent
  ]
})
export class NgxToastModule {
  
}