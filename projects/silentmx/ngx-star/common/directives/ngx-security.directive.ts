import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgxSecurityService } from '../services/ngx-security.service';

@Directive({
  selector: "[ngxSecurity]"
})
export class NgxSecurityDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private ngxSecurityService: NgxSecurityService
  ) { }

  @Input() set ngxSecurity(conditions: string[]) {
    this.ngxSecurityService.granted(conditions).subscribe(res => {
      this.viewContainer.clear();
      if (res) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    })
  }
}