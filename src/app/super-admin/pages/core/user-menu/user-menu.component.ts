import {Component, HostListener, Input, OnInit, ElementRef} from '@angular/core';
import {AuthenticationService} from '../../../../_services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  isOpen: boolean = false;
  Admin;
  id: string;
  @Input() currentUser = null;

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

  constructor(private elementRef: ElementRef,
              private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.id = localStorage.getItem('userInfo');
  }
  logout(): void {
    console.log('Logout');
    this.authenticationService.logout();
    this.router.navigate(['']);
  }
}
