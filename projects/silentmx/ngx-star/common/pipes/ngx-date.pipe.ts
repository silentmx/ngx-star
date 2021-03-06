import { DatePipe } from '@angular/common';
import { Inject, Pipe, PipeTransform } from '@angular/core';
import { NGX_LOCALE_ID } from '@silentmx/ngx-star/core';
import { BehaviorSubject } from 'rxjs';

@Pipe({
  name: "date",
  pure: false,
})
export class NgxDatePipe implements PipeTransform {

  constructor(
    @Inject(NGX_LOCALE_ID) private ngxLocaleId$: BehaviorSubject<string>,
    private datePipe: DatePipe,
  ) {

  }

  transform(
    value: Date | string | number | null | undefined,
    format?: string,
    timezone?: string,
    locale?: string,
  ): string | null {
    return this.datePipe.transform(
      value,
      format,
      timezone,
      locale ? locale : this.ngxLocaleId$.value
    );
  }
}