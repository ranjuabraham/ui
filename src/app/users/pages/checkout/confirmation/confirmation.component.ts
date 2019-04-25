import {Component, OnInit} from '@angular/core';
import {AppService} from "../../../../app.service";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {trigger} from "@angular/animations";
import {fadeIn, fadeOut} from "../../../@theme/utils/animations/fade-animations";
import * as jspdf from 'jspdf';

import html2canvas from 'html2canvas';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  animations: [
    trigger('fadeOut', fadeOut()),
    trigger('fadeIn', fadeIn(':enter'))
  ]
})
export class ConfirmationComponent implements OnInit {
  public responseData: any;
  public subTotal: any;

  constructor(public appService: AppService, private route: ActivatedRoute,
              private http: HttpClient) {
  }

  bookingId = this.route.snapshot.queryParamMap.get('txnId');

  ngOnInit() {
    this.getPaymentStatus();
  }


  getPaymentStatus() {
    this.appService.getApprovalRequest(this.appService.userInfo.usrId, this.appService.userInfo.usrTypeId, this.bookingId)
      .subscribe(res => {
        this.responseData = res;
        // console.log(JSON.parse(this.responseData.selectItems));
        const additionalHourAmt = this.responseData.adnlDurHrs * this.responseData.hourlyAmt;
        if (this.responseData.bookTyp === 'BUFFET') {
          this.subTotal = this.responseData.buffFinal - this.responseData.disAmount;
        } else {
          this.subTotal = this.responseData.rentFinal + additionalHourAmt - this.responseData.disAmount; // after discount amount
        }
        const selectedFoodMenus = JSON.parse(this.responseData.selectItems);
        Object.assign(this.responseData, {subTotal: this.subTotal, selectedFoodMenus: selectedFoodMenus});
        console.log(this.responseData);
      })
  }

  public captureScreen() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
// Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 500;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 10;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('hallsdiary-invoice.pdf'); // Generated PDF
    });
  }
}
