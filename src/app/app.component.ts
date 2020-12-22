import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { NgxI18nPipe, NgxLocaleService, NGX_LOCALE_ID } from '@silentmx/ngx-star/locale';
import { NgxToast } from '@silentmx/ngx-star/toast';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  date = new Date();
  localeId: string = "zh-Hans";
  localeOptions = [
    { name: "简体中文", value: "zh-Hans" },
    { name: "繁体中文", value: "zh-Hant" },
    { name: "English", value: "en" },
    { name: "日语", value: "ja" },
    { name: "德语", value: "de" },
    { name: "法语", value: "fr" }
  ];

  constructor(
    private ngxToast: NgxToast,
    private ngxLocaleService: NgxLocaleService,
    private httpClient: HttpClient,
    private ngxI18n: NgxI18nPipe,
    @Inject(NGX_LOCALE_ID) public ngxLocaleId$: BehaviorSubject<string>,
  ) {

    ngxLocaleId$.subscribe(locale => {
      this.httpClient.get<any>("https://console.huoshicloud.com/api/abp/application-configuration", {
        headers: new HttpHeaders({
          "accept-language": locale
        })
      }).subscribe(res => {
        let obj = {};
        for (let key of Object.keys(res.localization.values)) {
          obj = { ...obj, ...res.localization.values[key] }
        }
        this.ngxI18n.updateDataSource(obj);
      }, error => {
        this.ngxToast.error(error);
      })
    })

  }

  changeLocale() {
    this.ngxLocaleService.updateLocale(this.localeId);
  }
}
