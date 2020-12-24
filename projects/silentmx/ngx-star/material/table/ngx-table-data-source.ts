import { DataSource } from '@angular/cdk/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, Subscription } from 'rxjs';

/**
 * 服务器端分页 table datasource
 * @author silentmx
 */
export class NgxTableDataSource<T> extends DataSource<T> {
  public errorMsg: string = "";

  private readonly renderData = new BehaviorSubject<T[]>([]);
  /**
   * Subscription to the changes that should trigger an update to the table's rendered rows,
   * such as filtering, sorting, pagination, or base data changes.
   */
  private readonly renderChangesSubscription = Subscription.EMPTY;

  // Sort
  private _sort: MatSort | null;
  set sort(sort: MatSort) {
    this._sort = sort;
  }
  get sort(): MatSort | null {
    return this._sort;
  }

  // Paginator
  private _paginator: MatPaginator | null;
  set paginator(paginator: MatPaginator | null) {
    this._paginator = paginator;
  }
  get paginator(): MatPaginator | null {
    return this._paginator;
  }



  connect() {
    return this.renderData;
  }

  disconnect() {

  }
}