# NgxStar
  * NgxToastModule

# Install
```
yarn add @silentmx/ngx-star
```

# Setup
### setp1: add css
The CDK overlays depend on a small set of structural styles to work correctly. If you're using Angular Material, these styles have been included together with the theme, otherwise if you're using the CDK on its own, you'll have to include the styles yourself. You can do so by importing the prebuilt styles in your global stylesheet:
```
@import '~@angular/cdk/overlay-prebuilt.css';
```

### step 2: add NgxToastrModule to app NgModule
```
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
```

### use
```
import { Component } from '@angular/core';
import { NgxToast } from '@silentmx/ngx-star/toast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private ngxToast: NgxToast
  ) {
    this.ngxToast.success("ok");
  }
}
```

