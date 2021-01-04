import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxLocaleModule, NGX_LOCALE_ID } from '@silentmx/ngx-star/locale';
import { NgxMaterialModule } from '@silentmx/ngx-star/material';
import { NgxSecurityModule } from '@silentmx/ngx-star/security';
import { NgxToastModule } from '@silentmx/ngx-star/toast';
import { BehaviorSubject } from 'rxjs';
import { AppConfigService } from './app-config.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// app初始化工厂
const appInitFacory = (appConfigService: AppConfigService) => {
  return () => appConfigService.init();
}

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
    NgxSecurityModule,
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
    {
      provide: APP_INITIALIZER,
      useFactory: appInitFacory,
      multi: true,
      deps: [
        AppConfigService,
      ]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
