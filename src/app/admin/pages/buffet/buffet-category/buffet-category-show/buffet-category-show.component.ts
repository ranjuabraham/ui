import { Component, OnInit, ViewChild} from '@angular/core';
import { Router} from '@angular/router';
import 'rxjs/add/observable/of';
import { BuffetCategoryService } from '../buffet-category.service';
import { BuffetCategory} from '../buffet-category';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-buffet-category-show',
  templateUrl: './buffet-category-show.component.html',
  styleUrls: ['./buffet-category-show.component.scss']
})
export class BuffetCategoryShowComponent implements OnInit {

  public userInfo = JSON.parse(localStorage.getItem('userInfo'));
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public action = 'load';
  public resultInfo: BuffetCategory;
  displayedColumns: string[] = ['buffCatg', 'buffSubHdr', 'isFlg', 'alwToChoose', 'buffSubSeq', 'buffSubAct', 'action'];
  dataSource: MatTableDataSource<BuffetCategory>;
  restItems: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private buffetMasterService: BuffetCategoryService, private router: Router) { }

  ngOnInit() { 
    this.buffetMasterService.loadItems(this.prdctDetId)
    .subscribe(
      response => {
        this.restItems = response;
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadCreatePage(){
    this.router.navigate(['/venue/buffet-category/create']);
  }

}
