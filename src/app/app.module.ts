import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxToastModule } from '@silentmx/ngx-star/toast';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
