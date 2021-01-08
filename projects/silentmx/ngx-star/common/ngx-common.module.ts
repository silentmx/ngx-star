import { CommonModule, DatePipe } from '@angular/common';
import { Inject, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { NGX_FORROOT_GUARD, NGX_LOCALE_ID } from '@silentmx/ngx-star/core';
import { BehaviorSubject } from 'rxjs';
import { NGX_COMMON_DIRECTIVES } from './directives/index';
import { NGX_COMMON_PIPES } from './pipes/index';
import { NgxI18nService, NgxMenusService, NgxSecurityService } from './services';

/**
 * 从浏览器获取语言环境
 * @author silentmx
 */
export function getLocaleFromBrowser(): string {
  if (localStorage.getItem("ngx_locale_id")) {
    return localStorage.getItem("ngx_locale_id");
  }

  let language = window.navigator.language;
  if (language === "zh" || language === "zh-CN") {
    return "zh-Hans";
  }

  if (language === "zh-TW" || language === "zh-HK") {
    return "zh-Hant";
  }

  return language;
}


/**
 * 用来扩展Angular CommonModule能力，
 * 导入此模块，就不需要再导入Angular CommonModule
 * 
 * @publicApi
 * @author silentmx
 */
@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    NGX_COMMON_DIRECTIVES,
    NGX_COMMON_PIPES,
  ],
  declarations: [
    NGX_COMMON_DIRECTIVES,
    NGX_COMMON_PIPES,
  ],
  providers: [
    DatePipe,
  ]
})
export class NgxCommonModule {

  constructor(
    private ngxMenusService: NgxMenusService,
    @Inject(NGX_LOCALE_ID) private localeId$: BehaviorSubject<string>,
    @Optional() @Inject(NGX_FORROOT_GUARD) private guard: any,
    @Optional() @SkipSelf() private parentModule?: NgxCommonModule,
  ) {
    if (!this.parentModule && this.guard) {
      this.localeId$.subscribe(localeId => {
        localStorage.setItem("ngx_locale_id", localeId);
      });
    }
  }

  static forRoot(): ModuleWithProviders<NgxCommonModule> {
    return {
      ngModule: NgxCommonModule,
      providers: [
        NgxI18nService,
        NgxMenusService,
        NgxSecurityService,
        {
          provide: NGX_LOCALE_ID,
          useValue: new BehaviorSubject<string>(getLocaleFromBrowser())
        },
        {
          provide: NGX_FORROOT_GUARD,
          useFactory: provideForRootGuard,
          deps: [[NGX_LOCALE_ID, new Optional(), new SkipSelf()]]
        },
      ]
    }
  }
}

export function provideForRootGuard(config?: any): any {
  if (config) {
    throw new Error(`NgxCommonModule.forRoot() called twice.`);
  }
  return "guaded";
}