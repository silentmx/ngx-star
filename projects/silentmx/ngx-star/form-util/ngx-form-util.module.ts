import { NgModule } from '@angular/core';
import { NgxLocaleModule } from '@silentmx/ngx-star/locale';
import { NgxStopDirective } from './directive/ngx-stop.directive';
import { NgxConfirmValidator } from './validators/ngx-confirm.validator';

/**
 * Ngx Form module
 * @author silentmx
 */
@NgModule({
  imports: [
    NgxLocaleModule,
  ],
  declarations: [
    NgxConfirmValidator,
    NgxStopDirective
  ],
  exports: [
    NgxConfirmValidator,
    NgxStopDirective
  ]
})
export class NgxFormUtilModule {

}