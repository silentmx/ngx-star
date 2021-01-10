import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NGX_ICON_CONFIG } from '@silentmx/ngx-star/material';
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
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: NGX_ICON_CONFIG,
      useValue: {
        fontUrl: "//at.alicdn.com/t/font_2035839_xfn2vchuhbo.css",
        svgIcons: [
          { name: "logo", url: "/assets/svgs/logo.svg" }
        ]
      }
    },
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
