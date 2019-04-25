import { Component, OnInit, ViewChild} from '@angular/core';
import { Router} from '@angular/router';
import 'rxjs/add/observable/of';
import { GalleryService } from '../gallery.service';
import { Gallery} from '../gallery';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

export interface IndexItem {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-gallery-show',
  templateUrl: './gallery-show.component.html',
  styleUrls: ['./gallery-show.component.scss']
})

export class GalleryShowComponent implements OnInit {

  public userInfo = JSON.parse(localStorage.getItem('userInfo'));
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public action = 'load';
  public resultInfo: Gallery;
  displayedColumns: string[] = ['imgPath', 'imgFtrDet', 'imgTypId', 'imgSeq', 'action'];
  dataSource: MatTableDataSource<Gallery>;
  restItems: any;
  imageCount: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayImageType: IndexItem[] = [
    {value: 1, viewValue: 'ALL'},
    {value: 2, viewValue: 'DP / Home'},
    {value: 3, viewValue: 'About Us'},
    {value: 4, viewValue: 'Facilities'},
    {value: 5, viewValue: 'Offers'},
    {value: 6, viewValue: 'logo'}
  ];

  constructor(private galleryService: GalleryService, private router: Router) { }

  ngOnInit() {

    this.galleryService.loadItems(this.prdctDetId)
    .subscribe(
      response => {
        this.restItems = response;
        this.imageCount = response.result.length;
        if(this.restItems.status == 'SUCCESS'){
          this.dataSource = new MatTableDataSource(this.restItems.result);
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
    this.router.navigate(['/venue/gallery/create']);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}


