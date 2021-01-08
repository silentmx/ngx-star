import { Pipe, PipeTransform } from '@angular/core';
import { NgxI18nService } from '../services';

/**
 * 语言翻译管道
 * @author silentmx
 */
@Pipe({
  name: "ngxI18n",
  pure: false,
})
export class NgxI18nPipe implements PipeTransform {

  constructor(
    private ngxI18nService: NgxI18nService
  ) {

  }

  transform(value: string, args?: string[]): string {
    return this.ngxI18nService.transform(value, args);
  }
}