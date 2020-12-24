import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxLocaleModule } from '@silentmx/ngx-star/locale';
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
    NgxLocaleModule,
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