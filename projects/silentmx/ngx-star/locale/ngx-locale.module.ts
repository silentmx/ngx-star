import { CommonModule, DatePipe } from '@angular/common';
import "@angular/common/locales/global/de";
import "@angular/common/locales/global/en";
import "@angular/common/locales/global/fr";
import "@angular/common/locales/global/ja";
import "@angular/common/locales/global/zh-Hans";
import "@angular/common/locales/global/zh-Hant";
import "@angular/common/locales/global/zh-Hant-HK";
import { NgModule } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgxDatePipe } from './ngx-date.pipe';
import { NGX_LOCALE_ID } from './ngx-locale-config';

/**
 * 从浏览器获取语言环境
 * @author silentmx
 */
function getLocaleFromBrowser(): string {
  let languages = window.navigator.language;
  if (languages === "zh" || languages === "zh-CN") {
    return "zh-Hans";
  }

  if (languages === "zh-TW" || languages === "zh-HK") {
    return "zh-Hant";
  }

  return languages;
}


/**
 * Ngx 本地化模块
 * @author silentmx
 */
@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    NgxDatePipe,
  ],
  declarations: [
    NgxDatePipe
  ],
  providers: [
    DatePipe,
    { provide: NGX_LOCALE_ID, useValue: new BehaviorSubject<string>(getLocaleFromBrowser()) },
  ]
})
export class NgxLocaleModule {

}