import { Provider } from '@angular/core';
import { NgxEchartDirective } from './ngx-echart.dreictive';
import { NgxPieEchartDirective } from './ngx-pie-echart.directive';

export const NGX_ECHARTS_DIRECTIVES: Provider[] = [
  NgxEchartDirective,
  NgxPieEchartDirective
]