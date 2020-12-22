import { CommonModule, DatePipe } from '@angular/common';
import "@angular/common/locales/global/de";
import "@angular/common/locales/global/en";
import "@angular/common/locales/global/fr";
import "@angular/common/locales/global/ja";
import "@angular/common/locales/global/zh-Hans";
import "@angular/common/locales/global/zh-Hant";
import "@angular/common/locales/global/zh-Hant-HK";
import { NgModule } from '@angular/core';
import { NgxDatePipe } from './ngx-date.pipe';
import { NgxI18nPipe } from './ngx-i18n.pipe';

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
    NgxI18nPipe,
  ],
  declarations: [
    NgxDatePipe,
    NgxI18nPipe,
  ],
  providers: [
    DatePipe
  ]
})
export class NgxLocaleModule {

}