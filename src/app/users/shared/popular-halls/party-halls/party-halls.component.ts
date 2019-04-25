import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';
import {PopularHalls} from '../../../../app.models';
import {AppService} from "../../../../app.service";

@Component({
  selector: 'app-party-halls',
  templateUrl: './party-halls.component.html',
  styleUrls: ['./party-halls.component.scss']
})
export class PartyHallsComponent implements OnInit, AfterViewInit {
  @Input('popularPartyHalls') popularPartyHalls: Array<PopularHalls> = [];
  public partyConfig: SwiperConfigInterface = {};
  constructor(public appService: AppService) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.partyConfig = {
      observer: true,
      slidesPerView: 3,
      spaceBetween: 16,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
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
