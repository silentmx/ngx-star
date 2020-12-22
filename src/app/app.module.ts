import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxI18nPipe, NgxLocaleModule } from '@silentmx/ngx-star/locale';
import { NgxToastModule } from '@silentmx/ngx-star/toast';
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
    NgxLocaleModule
  ],
  providers: [
    NgxI18nPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
