import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogData} from '../marriage-halls/marriage-halls.component';
import {AppService} from '../../../../app.service';
import {
  SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface
} from 'ngx-swiper-wrapper';
import {VenueCategory} from '../../../../super-admin/pages/venue-management/venue-category/venue-category';
import {Gallery} from '../../../../app.models';
export interface IImage {
  // imgFtr: string | null;
  // imgFtrDet: string | null;
  // imgHdr: string | null;
  // imgId: number;
  // imgMover: string | null;
  // imgPath: string | null;
  // imgSeq: number;
  // imgTypId: number;
  imgType?: string;
  // prdctDetId?: number;
  // prdctId: number;
  url: string | null;
  href?: string;
  clickAction?: Function;
  caption?: string;
  title?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;
}
@Component({
  selector: 'app-gallery-dialog',
  templateUrl: './gallery-dialog.component.html',
  styleUrls: ['./gallery-dialog.component.scss']
})
export class GalleryDialogComponent implements OnInit {
  height: string = '400px';
  minHeight: string;
  arrowSize: string = '30px';
  showArrows: boolean = true;
  disableSwiping: boolean = false;
  autoPlay: boolean = true;
  autoPlayInterval: number = 3333;
  stopAutoPlayOnSlide: boolean = true;
  debug: boolean = false;
  backgroundSize: string = 'cover';
  backgroundPosition: string = 'center center';
  backgroundRepeat: string = 'no-repeat';
  showDots: boolean = true;
  dotColor: string = '#FE0000';
  showCaptions: boolean = true;
  captionColor: string = '#8F9DAA';
  captionBackground: string = '#fff';
  lazyLoad: boolean = false;
  hideOnNoSlides: boolean = false;
  width: string = '100%';
  galleryData: any;

  constructor(public dialogRef: MatDialogRef<GalleryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData, private appService: AppService) {
  }

  ngOnInit() {
    this.getHallReviews();
  }
  dialogCloce(): void {
    this.dialogRef.close();
  }


  public getHallReviews() {
    // this.appService.getHallGallery(this.data.prdctDetId).subscribe(data => {
    //   this.galleryData = data;
    //   console.log('gallery model');
    //   console.log(this.galleryData);
    // });
    this.appService.getHallGallery(this.data.prdctDetId).subscribe(data => {
      this.galleryData = data;
      console.log('gallery model');
      console.log(this.galleryData);
    });
  }

  public close(): void {
    this.dialogRef.close();
  }


}
