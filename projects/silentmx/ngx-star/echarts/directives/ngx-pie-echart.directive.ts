import { AfterViewInit, Directive, ElementRef, Inject, Input, OnDestroy } from '@angular/core';
import { deepCopy, NGX_THEME_MODE } from '@silentmx/ngx-star/core';
import * as Echarts from 'echarts';
import { BehaviorSubject, combineLatest, isObservable, Observable, of, Subscription } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { NgxEchartConfig, NGX_ECHART_CONFIG } from '../ngx-echarts.config';

export interface PieData {
  name: string;
  value: string;
}

@Directive({
  selector: "[ngxPieEchart]",
  host: {
    "style": `
      position: relative;
      box-sizing: border-box;
      height: 100%;
      min-height: 100%;
      width: 100%;
      min-width: 100%;
      display: flex;
    `
  }
})
export class NgxPieEchartDirective implements AfterViewInit, OnDestroy {
  private echartInstance: any = undefined;
  private renderSubscription = Subscription.EMPTY;
  private _data$: BehaviorSubject<PieData[]> = new BehaviorSubject<PieData[]>([]);

  @Input("ngxPieEchart") set data(data: PieData[] | Observable<PieData[]>) {
    if (isObservable(data)) {
      data.subscribe(res => {
        this._data$.next(res);
      })
    } else {
      this._data$.next(data);
    }
  }
  @Input("title") title: string = "";

  constructor(
    private elementRef: ElementRef,
    @Inject(NGX_THEME_MODE) private ngxThemeMode$: BehaviorSubject<string>,
    @Inject(NGX_ECHART_CONFIG) private ngxEchartConfig: NgxEchartConfig
  ) {

  }

  ngAfterViewInit() {
    this.renderSubscription?.unsubscribe();
    this.renderSubscription = combineLatest([
      this.ngxThemeMode$,
      this._data$
    ]).pipe(
      delay(0),
      switchMap(([_, data]) => {
        let options = {
          title: {
            text: this.title,
          },
          tooltip: {
            formatter: '{b} : {c} ({d}%)'
          },
          series: [{
            type: 'pie',
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        };
        return of(options);
      })
    ).subscribe((options) => {
      let echartOptions = deepCopy(new NgxEchartConfig(), this.ngxEchartConfig, options);
      if (this.echartInstance) {
        this.echartInstance.dispose();
      }
      this.echartInstance = Echarts.init(this.elementRef.nativeElement, this.ngxThemeMode$.value);
      this.echartInstance.setOption(echartOptions);
    });
  }

  ngOnDestroy() {
    this.renderSubscription?.unsubscribe();
  }

}