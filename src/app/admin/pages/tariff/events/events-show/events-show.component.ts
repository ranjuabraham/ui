import { Component, OnInit, ViewChild} from '@angular/core';
import { Router} from '@angular/router';
import 'rxjs/add/observable/of';
import { EventsService } from '../events.service';
import { Events} from '../events';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-events-show',
  templateUrl: './events-show.component.html',
  styleUrls: ['./events-show.component.scss']
})

export class EventsShowComponent implements OnInit {
  public userInfo = JSON.parse(localStorage.getItem('userInfo'));
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public action = 'load';
  //public tarType = 0;
  public eventInfo: Events;
  displayedColumns: string[] = ['subPrdctDetId', 'evtHdr', 'evtShwFor', 'evtSeq', 'evtAct', 'action'];
  dataSource: MatTableDataSource<Events>;
  restItems: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private eventService: EventsService, private router: Router) { }

  ngOnInit() {  
    this.eventService.loadEvents(this.prdctDetId)
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

  loadCreatePage(){
    this.router.navigate(['/venue/events/create']);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}

