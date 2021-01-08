import { Provider } from '@angular/core';
import { NgxDatePipe } from './ngx-date.pipe';
import { NgxI18nPipe } from './ngx-i18n.pipe';

export const NGX_COMMON_PIPES: Provider[] = [
  NgxI18nPipe,
  NgxDatePipe
];
