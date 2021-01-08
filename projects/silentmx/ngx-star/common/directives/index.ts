import { Provider } from '@angular/core';
import { NgxSecurityDirective } from './ngx-security.directive';
import { NgxStopDirective } from './ngx-stop.directive';

export const NGX_COMMON_DIRECTIVES: Provider[] = [
  NgxSecurityDirective,
  NgxStopDirective
];