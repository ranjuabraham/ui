import { Component, OnInit, ViewChild } from '@angular/core';
import { Router} from '@angular/router';
import 'rxjs/add/observable/of';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { VenueFacilityService} from '../venue-facility.service';
import { VenueFacility } from '../venue-facility';


@Component({
  selector: 'app-venue-facility-show',
  templateUrl: './venue-facility-show.component.html',
  styleUrls: ['./venue-facility-show.component.scss']
})
export class VenueFacilityShowComponent {

  public userInfo = JSON.parse(localStorage.getItem('userInfo'));
  public venueId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public action = 'load';
  public facilities: VenueFacility;
  displayedColumns: string[] = ['hallName', 'facName', 'facSpec', 'facAct', 'action'];
  dataSource: MatTableDataSource<VenueFacility>;
  restItems: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private facilityService: VenueFacilityService, private router: Router) { }

  ngOnInit() {
    this.facilityService.getFacility(this.venueId)
    .subscribe(response => {
      this.restItems = response;
      if(this.restItems.status == 'SUCCESS'){
          this.dataSource = new MatTableDataSource(this.restItems.result);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      }
      else{
        this.loadCreatePage();
      }
    });
  }

  loadFacilityMaster(){
    this.facilityService.loadFacilityMaster(this.venueId)
    .subscribe(heroes => {this.facilities = heroes;
    console.log(this.facilities);});
  }

  loadCreatePage(){
    this.router.navigate(['/venue/facilities/create']);
  }

  loadParams(prdctDetId: number, hallId: number, facId: number, attrId: number, content: string){
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
