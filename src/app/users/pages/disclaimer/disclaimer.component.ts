import { Component, OnInit } from '@angular/core';
import {DisclaimerService} from './disclaimer.service';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.scss']
})
export class DisclaimerComponent implements OnInit {
  disclaimerData: any;
  $id = 2;
  constructor(private disclaimerService: DisclaimerService) { }

  ngOnInit() {
    this.getDisclaimer();
  }
  getDisclaimer() {
    this.disclaimerService.disclaimer(this.$id)
      .subscribe(data => {this.disclaimerData = data; console.log(this.disclaimerData); });
  }

}
