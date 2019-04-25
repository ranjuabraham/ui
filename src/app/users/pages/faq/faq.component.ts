import { Component, OnInit } from '@angular/core';
import {FaqService} from './faq.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  faqData: any;
  $id = 1;
  panelOpenState = false;
  constructor(private faqService: FaqService) { }

  ngOnInit() {
    this.getFaq();
  }
  getFaq() {
    this.faqService.faq(this.$id)
      .subscribe(data => {this.faqData = data; console.log(this.faqData); });
  }
}
