import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EchartsComponent } from './echarts.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';

const routes: Routes = [
  { path: "", redirectTo: "/main/echarts/pie-chart", pathMatch: "full" },
  {
    path: "",
    component: EchartsComponent,
    data: {
      ngxMenu: {
        name: "Echarts",
        icon: "icon-desktop"
      }
    },
    children: [
      {
        path: "pie-chart",
        data: {
          ngxMenu: {
            name: "pie-chart",
          }
        },
        component: PieChartComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EchartsRoutingModule {

}