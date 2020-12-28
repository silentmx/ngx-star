import { DataSource } from '@angular/cdk/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import {
  BehaviorSubject,
  combineLatest,
  merge,
  Observable,
  of,
  Subject,
  Subscription
} from 'rxjs';
import { catchError, delay, finalize, map } from 'rxjs/operators';

export interface SearchConfig {
  key: string,
  label: string,
  type: string,
  options?: {
    key: string,
    value: string,
  }[],
}

/**
 * 服务器分页table dataSource
 * @author silentmx
 */
export class NgxTableDataSource<T> extends DataSource<T> {
  public loading: boolean = false;
  public params$ = new BehaviorSubject<{}>({});
  public errorMsg: string = "";
  public deleteId: string | number = ""; // 用来标记正在被删除的数据

  private readonly renderData = new BehaviorSubject<T[]>([]);
  get datas(): T[] {
    return this.renderData.value;
  }

  /**
   * Subscription to the changes that should trigger an update to the table's rendered rows
   * such as filtering, sorting, pagination, or base data changes.
   */
  private renderChangesSubscription = Subscription.EMPTY;
  private pageInitSubscription = Subscription.EMPTY;

  private readonly internalPageChanges = new Subject<void>();

  // Sort
  private _sort: MatSort | null;
  set sort(sort: MatSort | null) {
    this._sort = sort;
    this.updateChangesSubscription();
  }
  get sort(): MatSort | null {
    return this._sort;
  }

  // Paginator
  private _paginator: MatPaginator | null;
  set paginator(paginator: MatPaginator | null) {
    this._paginator = paginator;
    this.updateChangesSubscription();
  }
  get paginator(): MatPaginator | null {
    return this._paginator;
  }

  // Data service
  private _dataService: {
    service: any,
    methodName: string,
    params: {},
    searchConfigs?: SearchConfig[],
  }
  set dataService(
    dataService: { service: any, methodName: string, params: {}, searchConfigs?: SearchConfig[] }
  ) {
    this._dataService = dataService;
    this.updateChangesSubscription();
  }
  get dataService() {
    return this._dataService;
  }


  private updateChangesSubscription() {
    const originalParams = this.dataService?.params ? this.dataService.params : {};

    const sortChange: Observable<Sort | null | void> = this.sort ?
      merge(this.sort.sortChange, this.sort.initialized) as Observable<Sort | void> : of(null);

    const pageChange: Observable<PageEvent | null | void> = this.paginator ?
      merge(
        this.paginator.page,
        this.internalPageChanges,
        this.paginator.initialized
      ) as Observable<PageEvent | void> : of(null);

    this.pageInitSubscription?.unsubscribe();
    this.pageInitSubscription = combineLatest([this.params$, sortChange]).subscribe(() => {
      if (this.paginator && this.paginator.pageIndex > 0) {
        this.paginator.pageIndex = 0;
      }
      this.internalPageChanges.next();
    });
  
    const paramsStream = pageChange.pipe(
      map(() => {
        let params = { ...originalParams, ...this.params$.value };

        if (this.sort && this.sort.direction) {
          params = { ...params, ...{ sort: `${this.sort.active} ${this.sort.direction}` } }
        } else {
          params = { ...params, ...{ sort: undefined } };
        }

        if (this.paginator) {
          params = {
            ...params,
            ...{
              skipCount: this.paginator.pageSize * this.paginator.pageIndex,
              maxResultCount: this.paginator.pageSize
            }
          }
        } else {
          params = {
            ...params,
            ...{
              skipCount: 0,
              maxResultCount: 1000
            }
          }
        }

        return params;
      })
    );

    if (this.dataService) {
      this.renderChangesSubscription?.unsubscribe();
      this.renderChangesSubscription = paramsStream
        .pipe(delay(0))
        .subscribe(params => {
          this.loading = true;
          this.dataService.service[this.dataService.methodName](
            ...Object.values(params)
          ).pipe(
            finalize(() => this.loading = false),
            catchError((error) => {
              this.errorMsg = error;
              return of({ totalCount: 0, items: [] });
            }),
          ).subscribe(data => {
            if (this.paginator) {
              this.paginator.length = data.totalCount;
            }
            this.renderData.next(data.items);
          })
        })
    }
  }

  trackBy = (_: number, item: T | any) => {
    return item.id;
  }

  // 更新整页数据
  update() {
    this.internalPageChanges.next();
  }

  // 更新某条数据
  updateData(data: T | any) {
    let datas = this.datas.map((item: any) => {
      if (item.id == data.id) {
        return data;
      }
      return item;
    });
    this.renderData.next(datas);
  }

  // 添加数据
  addData(data: T) {
    let datas = this.datas;
    if (this.paginator) {
      this.paginator.length = this.paginator.length + 1;
      if (datas.length < this.paginator.pageSize) {
        datas.push(data);
        this.renderData.next(datas);
        return;
      }
    } else {
      datas.push(data);
      this.renderData.next(datas);
    }
  }

  // 删除数据
  deleteData(data: T | any) {
    if (!this.paginator) {
      let datas = this.datas.filter((item: any) => {
        return item.id != data.id;
      })
      this.renderData.next(datas);
      return;
    }

    if (this.paginator.pageIndex > 0) {
      const lastPageIndex = Math.ceil((this.paginator.length - 1) / this.paginator.pageSize) - 1 || 0;
      const newPageIndex = Math.min(this.paginator.pageIndex, lastPageIndex);

      if (newPageIndex !== this.paginator.pageIndex) {
        this.paginator.pageIndex = newPageIndex;
      }
      this.internalPageChanges.next();
    } else {
      this.paginator.length = this.paginator.length - 1 || 0;
      let datas = this.datas.filter((item: any) => {
        return item.id != data.id;
      })
      this.renderData.next(datas);
    }
  }

  connect(): Observable<T[] | readonly T[]> {
    return this.renderData;
  }

  disconnect(): void {

  }

}