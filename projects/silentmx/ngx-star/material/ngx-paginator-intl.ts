import { Inject, Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { NgxI18nService } from '@silentmx/ngx-star/common';
import { NGX_LOCALE_ID } from '@silentmx/ngx-star/core';
import { BehaviorSubject } from 'rxjs';

/**
 * MatPaginator 本地化
 */
@Injectable()
export class NgxPaginatorIntl extends MatPaginatorIntl {

  constructor(
    private ngxI18nService: NgxI18nService,
    @Inject(NGX_LOCALE_ID) private ngxLocaleId$: BehaviorSubject<string>
  ) {
    super();
    this.itemsPerPageLabel = this.ngxI18nService.transform("ItemsPerPage");
    this.firstPageLabel = this.ngxI18nService.transform("PagerFirst");
    this.lastPageLabel = this.ngxI18nService.transform("PagerLast");
    this.nextPageLabel = this.ngxI18nService.transform("PagerNext");
    this.previousPageLabel = this.ngxI18nService.transform("PagerPrevious");
    this.ngxLocaleId$.subscribe(locale => {
      this.itemsPerPageLabel = this.ngxI18nService.transform("ItemsPerPage");
      this.firstPageLabel = this.ngxI18nService.transform("PagerFirst");
      this.lastPageLabel = this.ngxI18nService.transform("PagerLast");
      this.nextPageLabel = this.ngxI18nService.transform("PagerNext");
      this.previousPageLabel = this.ngxI18nService.transform("PagerPrevious");
    });
  }
}