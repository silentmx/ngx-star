import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class NgxSecurityService {
  private static dataSource$: BehaviorSubject<Map<string, boolean>>
    = new BehaviorSubject<Map<string, boolean>>(new Map<string, boolean>());

  private get dataSource() {
    return NgxSecurityService.dataSource$.asObservable();
  }

  updateDataSource(data: { [key: string]: boolean }) {
    NgxSecurityService.dataSource$.next(new Map<string, boolean>(Object.entries(data)));
  }

  granted(conditions: string[] = []): Observable<boolean> {
    return this.dataSource.pipe(
      switchMap(dataSource => {
        if (conditions.length <= 0) {
          return of(false);
        }

        for (let condition of conditions) {
          if (dataSource.get(condition) && dataSource.get(condition) == true) {
            return of(true);
          }
        }

        return of(false);
      })
    )
  }
}