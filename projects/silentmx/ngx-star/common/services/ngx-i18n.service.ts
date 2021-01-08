import { Inject, Injectable } from '@angular/core';
import { NGX_LOCALE_ID } from '@silentmx/ngx-star/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class NgxI18nService {
  private static dataSource: Map<string, string> = new Map<string, string>();

  constructor(
    @Inject(NGX_LOCALE_ID) private ngxLocaleId$: BehaviorSubject<string>
  ) {

  }

  updateDataSource(data: { [key: string]: string }, localeId?: string): void {
    NgxI18nService.dataSource = new Map(Object.entries(data));
    if (localeId && localeId != this.ngxLocaleId$.value) {
      this.ngxLocaleId$.next(localeId);
    }
  }

  transform(value: string, args?: string[]): string {
    if (typeof (value) != "string") {
      return "";
    }

    let targetValue = NgxI18nService.dataSource.get(value);
    if (targetValue) {
      let argSet = new Set<string>(targetValue.match(/\{[0-9]*\}/g));
      if (argSet.size > 0 && args && args.length > 0) {
        let argMap = new Map(Array.from(argSet).map((item, index) => {
          return [
            item,
            args[index] ? args[index] : item
          ];
        }));

        targetValue = targetValue.replace(/\{[0-9]*\}/g, function (match, _number) {
          return argMap.get(match).toString();
        });
      }
      return targetValue;
    }

    return value;
  }

}