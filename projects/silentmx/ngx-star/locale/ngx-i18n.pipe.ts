import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Subject } from 'rxjs';

@Pipe({
  name: "ngxI18n",
  pure: false
})
export class NgxI18nPipe implements PipeTransform, OnDestroy {
  private readonly onUpdate: Subject<void> = new Subject<void>();
  private static dataSource: Map<string, string> = new Map(); 

  updateDataSource(data: { [key: string]: string }) {
    NgxI18nPipe.dataSource = new Map(Object.entries(data));
    this.onUpdate.next();
  }

  compleUpdate() {
    return this.onUpdate;
  }

  ngOnDestroy() {
    this.onUpdate.complete();
  }

  transform(key: string, args: string[] = []): string {
    let value = NgxI18nPipe.dataSource.get(key);
    if (value) {
      let argSet = new Set<String>(value.match(/\{[0-9]*\}/g));
      if (argSet.size > 0 && args.length > 0) {
        let argMap = new Map(Array.from(argSet).map((item, index) => {
          return [
            item,
            args[index] ? args[index] : item
          ]
        }));
        return value.replace(/\{[0-9]*\}/g, function (match, _number) {
          return argMap.get(match).toString();
        });
      }
      return value;
    } else {
      let argSet = new Set<String>(key.match(/\{[0-9]*\}/g));
      if (argSet.size > 0 && args.length > 0) {
        let argMap = new Map(Array.from(argSet).map((item, index) => {
          return [
            item,
            args[index] ? args[index] : item
          ]
        }));
        return key.replace(/\{[0-9]*\}/g, function (match, _number) {
          return argMap.get(match).toString();
        });
      }
      return key;
    }
  }

}