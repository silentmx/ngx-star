import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { NGX_COMMON_COMPONENTS } from './components/index';
import { NGX_COMMON_DIRECTIVES } from './directives/index';
import './global-locale';
import { NGX_COMMON_PIPES } from './pipes/index';

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
    NGX_COMMON_COMPONENTS,
    NGX_COMMON_DIRECTIVES,
    NGX_COMMON_PIPES,
  ],
  declarations: [
    NGX_COMMON_COMPONENTS,
    NGX_COMMON_DIRECTIVES,
    NGX_COMMON_PIPES,
  ],
  providers: [
    DatePipe,
  ]
})
export class NgxCommonModule {

}