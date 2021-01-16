import { NgModule } from '@angular/core';
import { NgxCommonModule } from '@silentmx/ngx-star/common';
import { NgxEchartsModule } from '@silentmx/ngx-star/echarts';
import { NgxMaterialModule } from '@silentmx/ngx-star/material';
import { EchartsRoutingModule } from './echarts-routing.module';
import { EchartsComponent } from './echarts.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';

@NgModule({
  imports: [
    NgxCommonModule,
    NgxMaterialModule,
    NgxEchartsModule,
    EchartsRoutingModule,
  ],
  declarations: [
    EchartsComponent,
    PieChartComponent
  ]
})
export class EchartsModule {

}