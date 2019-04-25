import {Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../../_services';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  isOpen: boolean = false;
  Admin;
  id: string;
  showMenu: boolean = false;
  public userName = JSON.parse(localStorage.getItem('userInfo')).usrFrstName;
  @Input() myAccount = null;

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

  constructor(private elementRef: ElementRef, private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
  }

  logout(): void {
    console.log('Logout');
    this.authenticationService.logout();
    this.router.navigate(['']);
  }

  openDropdown() {
    this.isOpen = true;
    console.log('open');
  }

  closeDropdown() {
    this.isOpen = false;
    console.log('closed');
  }
}
