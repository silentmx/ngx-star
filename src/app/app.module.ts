import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxI18nPipe, NgxLocaleModule, NGX_LOCALE_ID } from '@silentmx/ngx-star/locale';
import { NgxToastModule } from '@silentmx/ngx-star/toast';
import { BehaviorSubject } from 'rxjs';
import { AppInitService } from './app-init.service';
import { AppComponent } from './app.component';

// app初始化工厂
const appInitFacory = (appInitService: AppInitService) => {
  return () => appInitService.init();
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
    NgxLocaleModule
  ],
  providers: [
    NgxI18nPipe,
    { provide: NGX_LOCALE_ID, useValue: new BehaviorSubject<string>("zh-Hans") },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitFacory,
      multi: true,
      deps: [
        AppInitService,
      ]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
