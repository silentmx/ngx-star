import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocaleComponent } from './locale/locale.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  { path: "", redirectTo: "/main/locale", pathMatch: "full" },
  {
    path: "",
    component: MainComponent,
    children: [
      {
        path: "locale",
        component: LocaleComponent,
        data: {
          ngxMenu: {
            name: "Language",
            icon: "language"
          }
        }
      },
      {
        path: "material",
        data: {
          ngxMenu: {
            name: "Material",
            icon: "material",
          }
        },
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