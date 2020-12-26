import { NgModule } from '@angular/core';
import { NgxLocaleModule } from '@silentmx/ngx-star/locale';
import { ConfirmValidator } from './validators/confirm.validator';

/**
 * Ngx Form module
 * @author silentmx
 */
@NgModule({
  imports: [
    NgxLocaleModule
  ],
  declarations: [
    ConfirmValidator
  ],
  exports: [
    ConfirmValidator
  ]
})
export class NgxFormUtilModule {

}