import { Component, OnInit } from '@angular/core';
import {FooterService} from './footer.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  contactData: any;
  address = '';
  constructor(private  footerService: FooterService) { }
   currentYear;
  ngOnInit() {
    this.getContact();
  }
  /** GET: get Contact details from the server */
  getContact() {
    this.footerService.getContact()
      .subscribe(data => this.contactData = data);
    const date = new Date();
    this.currentYear = date.getFullYear();
  }
}
