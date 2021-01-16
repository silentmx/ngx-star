import { NgModule } from '@angular/core';
import { NGX_ECHARTS_DIRECTIVES } from './directives/index';

/**
 * 图表绘制模块，主要是对echarts的封装
 * @author silentmx
 */
@NgModule({
  imports: [],
  declarations: [
    NGX_ECHARTS_DIRECTIVES
  ],
  exports: [
    NGX_ECHARTS_DIRECTIVES
  ],
})
export class NgxEchartsModule {

}