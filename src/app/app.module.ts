import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxLocaleModule, NGX_LOCALE_ID } from '@silentmx/ngx-star/locale';
import { NgxMaterialModule } from '@silentmx/ngx-star/material';
import { NgxToastModule } from '@silentmx/ngx-star/toast';
import { BehaviorSubject } from 'rxjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxToastModule,
    NgxLocaleModule,
    NgxMaterialModule.forRoot({
      iconConfg: {
        fontIcon: {
          iconCssUrl: "//at.alicdn.com/t/font_2035839_jdwlm4m1h3.css",
          iconClass: "iconfont",
        },
        svgIcons: [
          { name: "logo", url: "assets/logo.svg" }
        ],
        iconSize: "20"
      }

    }),
    AppRoutingModule,
  ],
  providers: [
    { provide: NGX_LOCALE_ID, useValue: new BehaviorSubject<string>("zh-Hans") },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
