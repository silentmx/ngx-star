import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LevelComponent } from './level/level.component';

const routes: Routes = [
  { path: "other", redirectTo: "main/material/other/level", pathMatch: "full" },
  {
    path: "",
    data: {
      ngxMenu: {
        name: "other",
        icon: "icon-category"
      }
    },
    children: [
      {
        path: "level",
        data: {
          ngxMenu: {
            name: "level",
            icon: "icon-structure-fill"
          }
        },
        component: LevelComponent
      }
    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class OtherRoutingModule {

}