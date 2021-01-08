import { NgModule } from '@angular/core';
import { NgxCommonModule } from '@silentmx/ngx-star/common';
import { LocaleComponent } from './locale/locale.component';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

@NgModule({
  imports: [
    NgxCommonModule,
    MainRoutingModule,
  ],
  declarations: [
    MainComponent,
    NavMenuComponent,
    LocaleComponent
  ]
})
export class MainModule {

}