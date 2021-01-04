import { NgModule } from '@angular/core';
import { NgxSecurityDirective } from './ngx-security.directive';
import { NgxSecurityService } from './ngx-security.service';
/**
 * Ngx权限认证模块
 * @author silentmx
 */
@NgModule({
  imports: [

  ],
  declarations: [
    NgxSecurityDirective
  ],
  exports: [
    NgxSecurityDirective
  ],
  providers: [
    NgxSecurityService
  ]
})
export class NgxSecurityModule {

}