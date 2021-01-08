import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonComponent } from './button/button.component';

const routes: Routes = [
  { path: "", redirectTo: "/main/material/button", pathMatch: "full" },
  {
    path: "",
    data: {
      ngxMenu: {
        name: "Material",
        icon: "Material",
      }
    },
    children: [
      {
        path: "button",
        data: {
          ngxMenu: {
            name: "button",
            icon: "button"
          },
          security: ["button"]
        },
        component: ButtonComponent
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