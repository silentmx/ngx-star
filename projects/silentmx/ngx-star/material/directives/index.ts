import { Provider } from '@angular/core';
import { NgxErrorMessageDirective } from './ngx-error-message.directive';
import { NgxIconDirective } from './ngx-icon.directive';
import { NgxLoadingDirective } from './ngx-loading.directive';

export const NGX_MATERIAL_DIRECTIVES: Provider[] = [
  NgxIconDirective,
  NgxLoadingDirective,
  NgxErrorMessageDirective
]