import {Component, OnInit, ViewChild} from '@angular/core';
import {HelpManagement} from '../help-management';
import {HelpManagementService} from '../help-management.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DialogShowComponent} from '../dialog-show/dialog-show.component';

@Component({
  selector: 'app-help-show',
  templateUrl: './help-show.component.html',
  styleUrls: ['./help-show.component.scss']
})
export class HelpShowComponent implements OnInit {
  index: number;
  displayedColumns = ['sno', 'helpTypDesc', 'helpDesc', 'sequence', 'status', 'action'];
  dataSource: MatTableDataSource<HelpManagement>;
  restItems: HelpManagement[];
  helpId: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private helpManagementService: HelpManagementService, public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.helpManagementService.getHelpCategory()
      .subscribe(
        restItems => {
          this.restItems = restItems;
          this.dataSource = new MatTableDataSource(restItems);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  dialogShowDetails(
    helpTypDesc: string,
    helpDesc: string,
    helpSeq: number,
    helpBody: string,
    helpId: number,
  helpAct: number
  ) {
    this.helpId = helpId;
    // console.log(this.index);
    const dialogRef = this.dialog.open(DialogShowComponent, {
      data: {
        helpId: helpId,
        helpTypDesc: helpTypDesc,
        helpDesc: helpDesc,
        helpSeq: helpSeq,
        helpBody: helpBody,
        helpAct: helpAct
      }
    });
  }
}
