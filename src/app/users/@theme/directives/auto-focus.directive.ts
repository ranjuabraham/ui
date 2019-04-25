import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[autoFocus]'
})
export class AutofocusDirective implements AfterContentInit {

  @Input() public appAutoFocus: boolean;

  public constructor(private el: ElementRef) {

  }

  public ngAfterContentInit() {
    this.el.nativeElement.focus();

    // setTimeout(() => {
    //
    //   this.el.nativeElement.focus();
    //
    // }, 500);

  }

}
