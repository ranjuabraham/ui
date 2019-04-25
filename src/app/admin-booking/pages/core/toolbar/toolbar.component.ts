import {Component, ElementRef, HostListener, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {ToolbarHelpers} from './toolbar.helper';
import {MatDialog} from '@angular/material';
import {AppService} from '../../../../app.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav') sidenav: any;
  toolbarHelpers = ToolbarHelpers;
  categoryId = 4;
  page = 1;
  pageSize = 10;
  public content = 'all';
  listData;
  totalRecords;
  dataType;
  venueTypeId;

  constructor(public dialog: MatDialog,
              private router: Router,
              private appService: AppService,
              private httpClient: HttpClient,
              private el: ElementRef
  ) {
  }

  ngOnInit() {
    // this.onClick(this.categoryId);
    if (document.body.scrollTop > 0) {
      this.getCurrentSectionName();
    }
  }


  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.getCurrentSectionName();
  }
  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.sidenav.close();
      }
    });
  }

  private getCurrentSectionName(): string {
    const offset: number = this.el.nativeElement.parentElement.offsetTop - this.el.nativeElement.offsetTop;
    const header = document.getElementById('top-header');
    const sticky = header.offsetTop;
    if (window.pageYOffset > sticky) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
    return null;
  }
  get isLoggedIn(): boolean {
    // Check if current date is before token
    // expiration and user is signed in locally
    return JSON.parse(localStorage.getItem('userInfo'));
  }
}
