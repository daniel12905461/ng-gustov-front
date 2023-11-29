import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthGuardService } from '../service/auth-guard.service';

@Directive({
  selector: '[appHasPermission]'
})
export class HasPermissionDirective {
  private isHidden = true;

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authGuardService: AuthGuardService
  ) { }

  @Input()
  set appHasPermission(val: any[]) {
    if(val[0] == 'iniciar'){
      // val = this.authGuardService.canActivateAdmin();
      if(val) {
        this.viewContainer.clear();
        this.isHidden = false;
      } else {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.isHidden = true;
      }
    }else{
      // val = this.authGuardService.canActivateAdmin();
      if(val) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.isHidden = true;
      } else {
        this.viewContainer.clear();
        this.isHidden = false;
      }
    }
    // console.log(val[0]);
  }
}
