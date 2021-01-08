import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

/**
 * MatPaginator 本地化
 */
@Injectable()
export class NgxPaginatorIntl extends MatPaginatorIntl {

  // constructor(
  //   private ngxI18n: NgxI18nPipe,
  // ) {
  //   super();
  //   this.itemsPerPageLabel = this.ngxI18n.transform("ItemsPerPage");
  //   this.firstPageLabel = this.ngxI18n.transform("PagerFirst");
  //   this.lastPageLabel = this.ngxI18n.transform("PagerLast");
  //   this.nextPageLabel = this.ngxI18n.transform("PagerNext");
  //   this.previousPageLabel = this.ngxI18n.transform("PagerPrevious");
  //   this.ngxI18n.compleUpdate().subscribe(() => {
  //     this.itemsPerPageLabel = this.ngxI18n.transform("ItemsPerPage");
  //     this.firstPageLabel = this.ngxI18n.transform("PagerFirst");
  //     this.lastPageLabel = this.ngxI18n.transform("PagerLast");
  //     this.nextPageLabel = this.ngxI18n.transform("PagerNext");
  //     this.previousPageLabel = this.ngxI18n.transform("PagerPrevious");
  //   })
  // }
}