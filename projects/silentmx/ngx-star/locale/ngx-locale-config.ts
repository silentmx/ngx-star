import { InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * 语言环境依赖注入
 */
export const NGX_LOCALE_ID = new InjectionToken<BehaviorSubject<string>>("NGX_LOCALE_ID");