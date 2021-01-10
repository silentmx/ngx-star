import { Injectable, Optional, SkipSelf } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class NgxSecurityService {
  private static dataSource$: BehaviorSubject<Map<string, boolean>>
    = new BehaviorSubject<Map<string, boolean>>(new Map<string, boolean>());

  get dataSource() {
    return NgxSecurityService.dataSource$.asObservable();
  }

  constructor(
    @Optional() @SkipSelf() private parentService?: NgxSecurityService,
  ) {
    if (parentService) {
      throw Error(
        `[NgxSecurityService]: trying to create multiple instances,but this service should be a singleton.`
      );
    }
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