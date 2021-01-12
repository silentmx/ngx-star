import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonComponent } from './button/button.component';
import { DialogComponent } from './dialog/dialog.component';

const routes: Routes = [
  { path: "", redirectTo: "/main/material/button", pathMatch: "full" },
  {
    path: "",
    data: {
      ngxMenu: {
        name: "Material",
        icon: "icon-features",
      }
    },
    children: [
      {
        path: "button",
        data: {
          ngxMenu: {
            name: "button",
            icon: "icon-share"
          },
        },
        component: ButtonComponent
      }, {
        path: "dialog",
        data: {
          ngxMenu: {
            name: "dialog",
            icon: "icon-info"
          }
        },
        component: DialogComponent
      },
      {
        path: "other",
        loadChildren: () => import("./other/other.module").then(m => m.OtherModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialRoutingModule {

}