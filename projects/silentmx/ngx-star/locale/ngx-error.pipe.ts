import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: "ngxError"
})
export class NgxErrorPipe implements PipeTransform {

  transform(value: any) {
    return "";
  }

}