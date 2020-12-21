import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NGX_LOCALE_ID } from './ngx-locale-config';
import { NgxLocaleModule } from './ngx-locale.module';

@Injectable({
  providedIn: NgxLocaleModule
})
export class NgxLocaleService {

  constructor(
    @Inject(NGX_LOCALE_ID) private ngxLocaleId$: BehaviorSubject<string>
  ) {

  }

  updateLocale(localeId: string) {
    this.ngxLocaleId$.next(localeId);
  }

}