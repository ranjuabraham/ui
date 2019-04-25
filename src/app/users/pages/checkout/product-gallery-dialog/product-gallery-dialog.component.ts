import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogData} from '../../halls-list/marriage-halls/marriage-halls.component';
import {AppService} from '../../../../app.service';
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

export interface DialogData {
  productId: string;
}
@Component({
  selector: 'app-product-gallery-dialog',
  templateUrl: './product-gallery-dialog.component.html',
  styleUrls: ['./product-gallery-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductGalleryDialogComponent implements OnInit {

  height = '400px';
  galleryData: any;
  public productId;
  constructor(public dialogRef: MatDialogRef<ProductGalleryDialogComponent>, public appService: AppService,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.productId = data['productId'];
  }

  ngOnInit() {
    this.getVenueImages();
  }

  public getVenueImages() {
    this.appService.getHallGallery(this.productId).subscribe(res => {
      this.galleryData = res;
      console.log('gallery model');
      console.log(this.galleryData);
    });
  }
  public close(): void {
    this.dialogRef.close();
  }
}
