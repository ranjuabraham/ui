import { Component, OnInit } from '@angular/core';
import {CookiesService} from './cookies.service';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.scss']
})
export class CookiesComponent implements OnInit {


  cookiesData: any;
  $id = 127;
  constructor(private cookiesService: CookiesService) { }

  ngOnInit() {
    this.getCookies();
  }
  getCookies() {
    this.cookiesService.cookies(this.$id)
      .subscribe(data => {this.cookiesData = data; console.log(this.cookiesData); });
  }


}
