import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/observable/of';
import {ContactUsService} from '../contact-us.service';
import {ContactUs} from '../contact-us';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {callNgModuleLifecycle} from '@angular/core/src/view/ng_module';

@Component({
  selector: 'app-contact-us-show',
  templateUrl: './contact-us-show.component.html',
  styleUrls: ['./contact-us-show.component.scss']
})
export class ContactUsShowComponent implements OnInit {

  public userInfo = JSON.parse(localStorage.getItem('userInfo'));
  public venueId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public action = 'load';
  public contactInfo: ContactUs;
  public resultInfo: ContactUs;
  constructor(private contactUsService: ContactUsService, private router: Router) {
  }

  ngOnInit() {
    this.contactUsService.loadContactUs(this.venueId, this.userId, this.action)
      .subscribe(
        response => {
          if (response.status === 'SUCCESS') {
            this.resultInfo = response.result;
          } else {
            this.loadCreatePage();
          }
        }
      );
  }

  loadCreatePage() {
    this.router.navigate(['/venue/contact-us/create']);
  }

}
