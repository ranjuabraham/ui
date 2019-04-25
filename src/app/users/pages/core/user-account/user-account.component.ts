import {Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  isOpen: boolean = false;
  Admin;
  public userName = JSON.parse(localStorage.getItem('userInfo')).usrFrstName;
  id: string;
  @Input() userAccount = null;

  @HostListener('document:click', ['$event', '$event.target'])

  onClick(event: MouseEvent, targetElement: HTMLElement) {
    if (!targetElement) {
      return;
    }

    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.isOpen = false;
    }
  }
  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
  }

}
