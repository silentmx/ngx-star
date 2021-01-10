import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityComponent } from './security/security.component';

const routes: Routes = [
  { path: "", redirectTo: "/main/common/security", pathMatch: "full" },
  {
    path: "",
    data: {
      ngxMenu: {
        name: "common",
        icon: "icon-editions",
      }
    },
    children: [
      {
        path: "security",
        data: {
          ngxMenu: {
            name: "security",
            icon: "icon-verification-success",
          }
        },
        component: SecurityComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommRoutingModule {

}