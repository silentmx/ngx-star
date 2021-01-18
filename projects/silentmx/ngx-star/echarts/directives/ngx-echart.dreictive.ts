import { AfterViewInit, Directive, ElementRef, Inject, Input, OnDestroy } from '@angular/core';
import { deepCopy, NGX_THEME_MODE } from '@silentmx/ngx-star/core';
import * as Echarts from 'echarts';
import { BehaviorSubject, combineLatest, isObservable, Observable, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { NgxEchartConfig, NGX_ECHART_CONFIG } from '../ngx-echarts.config';

@Directive({
  selector: "[ngxEchart]",
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
export class NgxEchartDirective implements AfterViewInit, OnDestroy {
  private echartInstance: any = undefined;
  private renderSubscription = Subscription.EMPTY;
  private options$: BehaviorSubject<Object> = new BehaviorSubject<Object>({});

  @Input("ngxEchart")
  set ngxPieEchartOptions(options: Object | BehaviorSubject<Object> | Observable<Object>) {
    if (isObservable(options)) {
      options.subscribe(res => {
        this.options$.next(res);
      })
    } else {
      this.options$.next(options);
    }
  };

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
      this.options$,
      this.ngxThemeMode$
    ]).pipe(
      delay(0),
    ).subscribe(([options, mode]) => {
      let echartOptions = deepCopy(
        new NgxEchartConfig(),
        this.ngxEchartConfig,
        options,
        {
          title: {
            text: this.title,
          }
        }
      );
      if (this.echartInstance) {
        this.echartInstance.dispose();
      }
      this.echartInstance = Echarts.init(this.elementRef.nativeElement, mode);
      this.echartInstance.setOption(echartOptions);
    });
  }

  ngOnDestroy() {
    this.renderSubscription?.unsubscribe();
  }

}