import { Inject, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { NgxCommonModule } from '@silentmx/ngx-star/common';
import { NGX_FORROOT_GUARD, NGX_LOCALE_ID } from '@silentmx/ngx-star/core';
import { BehaviorSubject } from 'rxjs';
import { NGX_MATERIAL_COMPONENTS } from './components/index';
import { NGX_MATERIAL_DIRECTIVES } from './directives/index';
import { MAT_MODULES } from './mat-modules';
import { NgxMaterialService } from './ngx-material.service';
import { NgxPaginatorIntl } from './ngx-paginator-intl';

/**
 * Ngx Anagular material module
 * @author silentmx
 */
@NgModule({
  imports: [
    RouterModule,
    NgxCommonModule,
    MAT_MODULES
  ],
  exports: [
    MAT_MODULES,
    NGX_MATERIAL_COMPONENTS,
    NGX_MATERIAL_DIRECTIVES
  ],
  declarations: [
    NGX_MATERIAL_COMPONENTS,
    NGX_MATERIAL_DIRECTIVES
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: NgxPaginatorIntl }
  ]
})
export class NgxMaterialModule {

  constructor(
    private dateAdapter: DateAdapter<any>,
    @Inject(NGX_LOCALE_ID) private ngxLocaleId$: BehaviorSubject<string>,
    @Optional() private ngxMaterialService: NgxMaterialService,
    @Optional() @Inject(NGX_FORROOT_GUARD) guard: any,
  ) {
    // 配置material组件语言环境
    this.ngxLocaleId$.subscribe(locale => {
      this.dateAdapter.setLocale(locale);
    })
  }

  static forRoot(): ModuleWithProviders<NgxMaterialModule> {
    return {
      ngModule: NgxMaterialModule,
      providers: [
        NgxMaterialService,
        {
          provide: NGX_FORROOT_GUARD,
          useFactory: provideForRootGuard,
          deps: [[NgxMaterialService, new Optional(), new SkipSelf()]]
        }
      ]
    }
  }
}

export function provideForRootGuard(ngxMaterialService: NgxMaterialService): any {
  if (ngxMaterialService) {
    throw new Error(`NgxMaterialModule.forRoot() called twice.`);
  }
  return "ngxMaterialService";
}