import {Component, ElementRef, HostListener, OnInit, ViewChild, AfterViewInit, Input} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {ToolbarHelpers} from './toolbar.helper';
import {LoginDialogComponent} from '../../login-dialog/login-dialog.component';
import {MatDialog} from '@angular/material';
import {DataService} from '../../halls-list/data.service';
import {AppService} from '../../../../app.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav') sidenav: any;
  public userName = JSON.parse(localStorage.getItem('userInfo'));
  @Input() myAccount = null;
  sideNavOpened: boolean = true;
  toolbarHelpers = ToolbarHelpers;
  categoryId = 4;
  page = 1;
  pageSize = 10;
  public content = 'all';
  listData;
  totalRecords;
  dataType;
  venueTypeId;
  events: string[] = [];
  opened: boolean;
  hasBackdrop: boolean;
  constructor(public dialog: MatDialog, private _dataService: DataService,
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
  // close(reason: string) {
  //   this.sidenav.close();
  // }
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

  loginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      disableClose: true,
      data: {},
      autoFocus: true,
      panelClass: 'login-dialog-box'
    });
  }

  categorySearch(categoryId: number) {
    this.categoryId = categoryId;
    this.httpClient.get<any>('/ema/venue/load-hall-list', {
      params: {
        categoryId: this.categoryId.toString(), page: '1', pageSize: '10', content: 'all'
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.listData = response;
        this.totalRecords = this.listData.body.count;
        this.dataType = this.listData.body.page;
        if (this.listData.body.categoryId === 4) {
          this._dataService.insertData(this.listData);
          this.router.navigate(['chennai/marriage-halls']);
        } else if (this.listData.body.categoryId === 3) {
          this._dataService.insertData(this.listData);
          this.router.navigate(['chennai/mini-halls']);
        } else if (this.listData.body.categoryId === 7) {
          this._dataService.insertData(this.listData);
          this.router.navigate(['chennai/banquet-halls']);
        } else if (this.listData.body.categoryId === 2) {
          this._dataService.insertData(this.listData);
          this.router.navigate(['chennai/party-halls']);
        } else {
          console.log('not working');
        }
        // this.router.navigate(['chennai/marriage-halls']);
        // console.log(response);
      })
      .catch(console.log);
  }

  // onClick(categoryId: number) {
  //   this.categoryId = categoryId;
  //   this._dataService.setOption('mainCategoryId', this.categoryId);
  //   if (this.categoryId === 4) {
  //     this.router.navigate(['/chennai/marriage-halls']);
  //     window.location.reload();
  //   }
  //   if (this.categoryId === 3) {
  //     this.router.navigate(['/chennai/mini-halls']);
  //     window.location.reload();
  //   }
  //   if (this.categoryId === 7) {
  //     this.router.navigate(['/chennai/banquet-halls']);
  //     window.location.reload();
  //   }
  //   if (this.categoryId === 2) {
  //     this.router.navigate(['/chennai/party-halls']);
  //     window.location.reload();
  //   }
  //   // console.log(this.categoryId);
  //   // console.log('krishna CategoryId');
  // }
}
