import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NGX_LOCALE_ID } from './ngx-locale-config';
import { NgxLocaleModule } from './ngx-locale.module';

export interface Language {
  locale_id: string,
  name: string,
  isSelect?: boolean,
}

@Injectable({
  providedIn: NgxLocaleModule
})
export class NgxLocaleService {
  private static _languages: Language[] = [];
  get languages(): Language[] {
    return NgxLocaleService._languages;
  }

  constructor(
    @Inject(NGX_LOCALE_ID) private ngxLocaleId$: BehaviorSubject<string>
  ) {

  }

  updateLanguages(languages: Language[]) {
    NgxLocaleService._languages = languages.map(item => {
      if (item.locale_id == this.ngxLocaleId$.value) {
        item.isSelect = true;
      } else {
        item.isSelect = false;
      }
      return item;
    });
  }

  updateLocale(localeId: string) {
    this.ngxLocaleId$.next(localeId);
  }

}