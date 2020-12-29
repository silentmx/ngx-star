import {
  Inject,
  InjectionToken,
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxLocaleModule, NGX_LOCALE_ID } from '@silentmx/ngx-star/locale';
import { BehaviorSubject } from 'rxjs';
import { NgxAlertDialog } from './alert/ngx-alert.dialog';
import { NgxAvatarComponent } from './avatar/ngx-avatar.component';
import { NgxLoadingDirective } from './button/ngx-loading.directive';
import { NgxErrorMessageDirective } from './form-field/ngx-error-message.directive';
import { NgxIconConfig } from './icon/ngx-icon.config';
import { NgxIconDirective } from './icon/ngx-icon.directive';
import { NgxMaterialConfig } from './ngx-material.config';
import { NgxPaginatorIntl } from './table/ngx-paginator-intl';
import { NgxToggleComponent } from './toggle/ngx-toggle.component';

export const NGX_FORROOT_GUARD = new InjectionToken<void>("NGX_FORROOT_GUARD");

// Angular Material Modules
export const matModules = [
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatTreeModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatMenuModule,
  MatSlideToggleModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressBarModule,
  MatTooltipModule,
  MatDividerModule,
  MatSelectModule,
  MatDialogModule,
  MatTabsModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatChipsModule,
  MatExpansionModule,
];

// 自定义组件
export const ngxComponents = [
  NgxAlertDialog,
  NgxAvatarComponent,
  NgxLoadingDirective,
  NgxIconDirective,
  NgxErrorMessageDirective,
  NgxToggleComponent
];

/**
 * Ngx Anagular material config module
 * @author silentmx
 */
@NgModule({
  imports: [
    NgxLocaleModule,
    FlexLayoutModule,
    matModules,
  ],
  exports: [
    FlexLayoutModule,
    matModules,
    ngxComponents,
  ],
  declarations: [
    ngxComponents
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: NgxPaginatorIntl,
    }
  ]
})
export class NgxMaterialModule {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private config: NgxIconConfig,
    private dateAdapter: DateAdapter<any>,
    @Inject(NGX_LOCALE_ID) private ngxLocaleId$: BehaviorSubject<string>,
    @Optional() @Inject(NGX_FORROOT_GUARD) guard: any,
    @Optional() @SkipSelf() parentModule?: NgxMaterialModule
  ) {
    if (guard && !parentModule) {
      // 设置mat-icon图标库
      if (this.config.fontIcon) {
        const head = document.getElementsByTagName("head")[0];
        const link = document.createElement("link");
        link.id = "fontIcon";
        link.rel = "stylesheet";
        link.href = this.config.fontIcon.iconCssUrl;
        head.appendChild(link);

        // 修改图标库默认fontset
        this.matIconRegistry.setDefaultFontSetClass(this.config.fontIcon.iconClass);
      }

      // 设置svgIcon
      if (this.config.svgIcons && this.config.svgIcons.length > 0) {
        this.config.svgIcons.forEach(item => {
          this.matIconRegistry.addSvgIcon(
            item.name,
            this.sanitizer.bypassSecurityTrustResourceUrl(item.url)
          );
        })
      }

      // 配置material组件语言环境
      this.ngxLocaleId$.subscribe(locale => {
        this.dateAdapter.setLocale(locale);
      })
    }
  }

  static forRoot(config?: NgxMaterialConfig): ModuleWithProviders<NgxMaterialModule> {
    return {
      ngModule: NgxMaterialModule,
      providers: [
        {
          provide: NgxIconConfig,
          useValue: { ...new NgxIconConfig(), ...config.iconConfg },
        },
        {
          provide: MAT_DIALOG_DEFAULT_OPTIONS,
          useValue: {
            ...{ width: "600px", hasBackdrop: true, autoFocus: true },
            ...config.dialogConfig
          },
        },
        {
          provide: NGX_FORROOT_GUARD,
          useFactory: provideForRootGuard,
          deps: [[NgxMaterialConfig, new Optional(), new SkipSelf()]]
        },
      ]
    }
  }
}

export function provideForRootGuard(config?: NgxIconConfig): any {
  if (config) {
    throw new Error(`NgxMaterialModule.forRoot() called twice.`);
  }
  return "guaded";
}