import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { NgxI18nPipe, NgxLocaleService, NGX_LOCALE_ID } from '@silentmx/ngx-star/locale';
import { NgxToast } from '@silentmx/ngx-star/toast';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class AppInitService {

  constructor(
    private ngxToast: NgxToast,
    public ngxLocaleService: NgxLocaleService,
    private httpClient: HttpClient,
    private ngxI18n: NgxI18nPipe,
    @Inject(NGX_LOCALE_ID) private ngxLocaleId$: BehaviorSubject<string>
  ) {

  }

  init(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.ngxLocaleId$.subscribe(locale => {
        this.httpClient.get<any>("https://console.huoshicloud.com/api/abp/application-configuration", {
          headers: new HttpHeaders({
            "accept-language": this.ngxLocaleId$.value
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
            args: ["ik", "fds"]
          });
          resolve(true);
        }, error => {
          this.ngxToast.error(error);
        })
      })

    });
  }
}