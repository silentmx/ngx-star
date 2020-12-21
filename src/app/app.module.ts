import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxLocaleModule } from '@silentmx/ngx-star/locale';
import { NgxToastModule } from '@silentmx/ngx-star/toast';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxToastModule,
    NgxLocaleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
