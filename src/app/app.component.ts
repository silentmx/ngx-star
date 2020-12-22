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

  constructor(
    private ngxToast: NgxToast,
    public ngxLocaleService: NgxLocaleService,
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

        this.ngxLocaleService.updateLanguages(res.localization.languages.map(item => {
          return {
            locale_id: item.cultureName,
            name: item.displayName
          }
        }));
        this.ngxToast.error({
          message: "'{0}' and '{1}' do not match.",
          args: ["ok", "fsd", "ssss"]
        });
      }, error => {
        this.ngxToast.error(error);
      })
    })

  }

  changeLocale() {
    console.log(this.localeId);
    this.ngxLocaleService.updateLocale(this.localeId);
  }
}
