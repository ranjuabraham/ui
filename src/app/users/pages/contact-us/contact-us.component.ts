import { Component, OnInit } from '@angular/core';
import {ContactUsService} from './contact-us.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  contactUsData: any;
  constructor(private contactUsService: ContactUsService) { }

  ngOnInit() {
    this.getContactUs();
  }
  getContactUs() {
    this.contactUsService.contactUs()
      .subscribe(data => {this.contactUsData = data; console.log(this.contactUsData); });
  }
}
