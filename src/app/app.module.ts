import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxCommonModule } from '@silentmx/ngx-star/common';
import { NgxMaterialModule } from '@silentmx/ngx-star/material';
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
    HttpClientModule,
    NgxCommonModule.forRoot(),
    NgxMaterialModule.forRoot({
      iconConfg: {
        fontIcon: {
          iconCssUrl: "//at.alicdn.com/t/font_2035839_ohigp0ig2yk.css",
          iconClass: "iconfont",
        },
        svgIcons: [
          { name: "logo", url: "assets/svgs/logo.svg" },
          { name: "404", url: "assets/svgs/404.svg" },
          { name: "401", url: "assets/svgs/401.svg" }
        ],
        iconSize: "20"
      }
    }),
    AppRoutingModule,
  ],
  providers: [
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
