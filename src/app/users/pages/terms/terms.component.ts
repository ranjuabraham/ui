import { Component, OnInit } from '@angular/core';
import { TermsService } from './terms.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

  termsData: any;
  $id = 3;
  constructor(private termsService: TermsService) { }

  ngOnInit() {
    this.getTerms();
  }
  getTerms() {
    this.termsService.terms(this.$id)
      .subscribe(data => {this.termsData = data; console.log(this.termsData); });
  }

}
