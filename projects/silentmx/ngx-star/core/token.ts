import { InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * 语言环境
 */
export const NGX_LOCALE_ID = new InjectionToken<BehaviorSubject<string>>("NGX_LOCALE_ID");

/**
 * 模块forRoot静态方法调用守卫
 */
export const NGX_FORROOT_GUARD = new InjectionToken<void>("NGX_FORROOT_GUARD");