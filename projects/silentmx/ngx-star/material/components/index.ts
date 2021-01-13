import { Provider } from '@angular/compiler/src/core';
import { NgxWarningDialog } from './alert/ngx-warning.dialog';
import { NgxNavMenuComponent } from './nav-menu/ngx-nav-menu.component';
import { NgxThemeComponent } from './theme/ngx-theme.component';
import { NgxToggleComponent } from './toggle/ngx-toggle.component';

export {
  NgxWarningDialog
};

export const NGX_MATERIAL_COMPONENTS: Provider[] = [
  NgxNavMenuComponent,
  NgxWarningDialog,
  NgxToggleComponent,
  NgxThemeComponent
]