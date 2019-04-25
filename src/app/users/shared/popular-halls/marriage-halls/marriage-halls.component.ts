import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';
import {PopularHalls} from '../../../../app.models';
import {AppService} from "../../../../app.service";

@Component({
  selector: 'app-marriage-halls',
  templateUrl: './marriage-halls.component.html',
  styleUrls: ['./marriage-halls.component.scss']
})
export class MarriageHallsComponent implements OnInit, AfterViewInit {
  @Input('popularMarriageHalls') popularMarriageHalls: Array<PopularHalls> = [];
  public marriageConfig: SwiperConfigInterface = {};
  category = 'marriage-halls';
  constructor(public appService: AppService) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.marriageConfig = {
      observer: true,
      slidesPerView: 3,
      spaceBetween: 16,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      loopedSlides: 3,
      loop: false,
      preloadImages: false,
      lazy: true,
      breakpoints: {
        480: {
          slidesPerView: 1
        },
        740: {
          slidesPerView: 2,
        },
        960: {
          slidesPerView: 2,
        },
        1280: {
          slidesPerView: 3,
        },
        1500: {
          slidesPerView: 3,
        }
      }
    };
  }
}
