import {Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, MatSort , MatTableDataSource} from '@angular/material';
import { Router} from '@angular/router';
import { VenueProfile} from '../venue-profile';
import { VenueProfileService} from '../venue-profile.service';

export interface IndexItem {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-venue-profile-show',
  templateUrl: './venue-profile-show.component.html',
  styleUrls: ['./venue-profile-show.component.scss']
})
export class VenueProfileShowComponent implements OnInit {
  public userInfo = JSON.parse(localStorage.getItem('userInfo'));
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public action = 'load';
  public restItems: any;
  public resultInfo: VenueProfile;

  displayType: IndexItem[] = [
    {value: 4, viewValue: 'Marriage Halls'},
    {value: 3, viewValue: 'Mini Halls'},
    {value: 7, viewValue: 'Banquet Halls'},
    {value: 2, viewValue: 'Party Halls'},
    {value: 0, viewValue: 'Others'}
  ];

  constructor(private profileService: VenueProfileService, private router : Router) { }

  ngOnInit() {
    this.loadVenueProfile();
  }

  loadVenueProfile() {
    this.profileService.getProfileInfo(this.prdctDetId)
      .subscribe(response => {
        this.restItems = response;
        console.log('asasasasas');
        console.log(this.restItems.status);
        if(this.restItems.status == 'SUCCESS'){
          this.resultInfo = this.restItems.result;
        }
        else{
          this.loadCreatePage();
        } });
      }

      loadCreatePage(){
        this.router.navigate(['/venue/venue-profile/create']);
      }
}
