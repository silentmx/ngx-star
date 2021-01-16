import { InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * 语言环境依赖注入
 * 默认从浏览器获取语言环境
 *
 * @author silentmx
 */
export const NGX_LOCALE_ID =
  new InjectionToken<BehaviorSubject<string>>("NGX_LOCALE_ID", {
    providedIn: "root",
    factory: (): BehaviorSubject<string> => {
      return new BehaviorSubject<string>(((): string => {
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
      })())
    }
  });

/**
 * 模块forRoot静态方法调用守卫
 */
export const NGX_FORROOT_GUARD = new InjectionToken<void>("NGX_FORROOT_GUARD");

/**
 * 主题模式依赖注入
 */
export const NGX_THEME_MODE = new InjectionToken<BehaviorSubject<string>>("NGX_THEME_MODE", {
  providedIn: "root",
  factory: (): BehaviorSubject<string> => {
    return new BehaviorSubject<string>(((): string => {
      return localStorage.getItem("ngx_theme_mode") ? localStorage.getItem("ngx_theme_mode") : "light";
    })())
  }
})