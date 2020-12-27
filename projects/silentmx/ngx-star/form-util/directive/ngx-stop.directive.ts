import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: "[ngx-stop]"
})
export class NgxStopDirective {

  @HostListener("click", ["$event"])
  public onClick($event: any): void {
    $event.stopPropagation();
  }
}