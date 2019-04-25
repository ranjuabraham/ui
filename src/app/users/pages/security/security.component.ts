import { Component, OnInit } from '@angular/core';
import {SecurityService} from './security.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {


  securityData: any;
  $id = 9;
  constructor(private securityService: SecurityService) { }

  ngOnInit() {
    this.getSecurity();
  }
  getSecurity() {
    this.securityService.security(this.$id)
      .subscribe(data => {this.securityData = data; console.log(this.securityData); });
  }


}
