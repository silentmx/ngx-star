import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  { path: "", redirectTo: "/main/common/security", pathMatch: "full" },
  {
    path: "",
    component: MainComponent,
    children: [
      {
        path: "common",
        loadChildren: () => import("./comm/comm.module").then((m) => m.CommModule),
      },
      {
        path: "material",
        loadChildren: () => import("./material/material.module").then((m) => m.MaterialModule),
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {

}