import { Component, OnInit } from '@angular/core';
import {PrivacyService} from './privacy.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

  privacyData: any;
  $id = 8;
  constructor(private privacyService: PrivacyService) { }

  ngOnInit() {
    this.getPrivacy();
  }
  getPrivacy() {
    this.privacyService.privacy(this.$id)
      .subscribe(data => {this.privacyData = data; console.log(this.privacyData); });
  }


}
