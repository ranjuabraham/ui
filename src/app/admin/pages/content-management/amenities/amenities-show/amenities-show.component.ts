import { Component, OnInit, ViewChild} from '@angular/core';
import { Router} from '@angular/router';
import 'rxjs/add/observable/of';
import { AmenitiesService} from '../amenities.service';
import { Amenities} from '../amenities';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-amenities-show',
  templateUrl: './amenities-show.component.html',
  styleUrls: ['./amenities-show.component.scss']
})
export class AmenitiesShowComponent implements OnInit {

  public userInfo = JSON.parse(localStorage.getItem('userInfo'));
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public action = 'load';
  public amenities: Amenities;
  displayedColumns: string[] = ['facName', 'facSpec', 'attrId', 'facAct', 'action'];
  dataSource: MatTableDataSource<Amenities>;
  restItems: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private amenitiesService: AmenitiesService, private router: Router) { }

  ngOnInit() {
    this.amenitiesService.loadAmenities(this.prdctDetId)
    .subscribe(
      response => {
        this.restItems = response;
        if(this.restItems.status == 'SUCCESS'){
          this.dataSource = new MatTableDataSource(this.restItems.amenities);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        else{
          this.loadCreatePage();
        }
      }
    );
}

loadCreatePage(){
  this.router.navigate(['/venue/amenities/create']);
}

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

}
