import { Component, OnInit } from '@angular/core';
import {AboutUsService} from './about-us.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  aboutUsData: any;
  constructor(private aboutUsService: AboutUsService) { }

  ngOnInit() {
    this.getAboutUs();
  }
  getAboutUs() {
    this.aboutUsService.aboutUs()
      .subscribe(data => {this.aboutUsData = data;});
  }
}
