import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { NgxI18nService } from '@silentmx/ngx-star/common';
import { NGX_LOCALE_ID } from '@silentmx/ngx-star/core';
import { BehaviorSubject } from 'rxjs';

/**
 * App 全局配置服务，以及订阅数据提供者
 * @author silentmx
 */
@Injectable({
  providedIn: "root"
})
export class AppConfigService {

  constructor(
    private ngxI18nService: NgxI18nService,
    private httpClient: HttpClient,
    @Inject(NGX_LOCALE_ID) private ngxLocaleId$: BehaviorSubject<string>,
  ) {

  }

  /**
   * 初始化, 只给APP_INITIALIZER调用一次，更新配置请调用updateConfig()方法
   */
  init(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.httpClient.get(`/assets/locale/${this.ngxLocaleId$.value}.json`)
        .subscribe(data => {
          this.setNgxI18nData(data, this.ngxLocaleId$.value);
          resolve(true);
      });
    });
  }

  updateLanguage(locale: string) {
    this.httpClient.get(`/assets/locale/${locale}.json`)
      .subscribe(data => {
        this.setNgxI18nData(data, locale)
      });
  }

  private setNgxI18nData(data: {} = {}, locale: string = "zh-Hans") {
    this.ngxI18nService.updateDataSource(data, locale);
  }

}