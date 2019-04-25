import { Component, OnInit, ViewChild} from '@angular/core';
import 'rxjs/add/observable/of';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource} from '@angular/material';
import { UpdateTransactionService } from '../update-transaction.service'; 
import { UpdateTransaction} from '../update-transaction';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { NotificationService} from '../../../shared/notification';
import { OfflineTransactionDialogComponent} from '../offline-transaction-dialog/offline-transaction-dialog.component';


@Component({
  selector: 'app-offline-transaction-show',
  templateUrl: './offline-transaction-show.component.html',
  styleUrls: ['./offline-transaction-show.component.scss']
})
export class OfflineTransactionShowComponent implements OnInit {

  public userInfo = JSON.parse(localStorage.getItem('userInfo'));
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public userTypeId = JSON.parse(localStorage.getItem('userInfo')).usrTypeId;
  public action = 'load';
  public resultInfo: UpdateTransaction;
  displayedColumns: string[] = ['dcdeHdr', 'bookedOn', 'date', 'duration', 'status', 'action'];
  dataSource: MatTableDataSource<UpdateTransaction>;
  restItems: any;
  blockType: number = 1;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private transactionService: UpdateTransactionService,
    private router: Router,
    public dialog: MatDialog,
    private notificationService: NotificationService) { }
 
    ngOnInit() {  
      this.transactionService.loadOfflineTransactions(this.prdctDetId, this.blockType, this.userId, this.userTypeId)
      .subscribe(
        response => {
          this.restItems = response;
            if(this.restItems.status == 'SUCCESS') {
            this.dataSource = new MatTableDataSource(this.restItems.result);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
          else{
            this.loadErrorPage();
          }
        });
    }

    updateOfflineTransaction(prdctDetId: string, usrId: string, txnId: string, status: string){
       this.transactionService.updateTransaction(prdctDetId, usrId, this.userId, txnId, status)
        .subscribe(response => {
          if (response === 'SUCCESS') {
            this.notificationService.onSuccess('Successfully Updated.');
          } else {
            this.notificationService.onError('Oops! Something went wrong.');
          }
        });
      }

    loadErrorPage(){
      console.log('Not Found')
    }

    showDetails(data: any) {
      const dialogRef = this.dialog.open(OfflineTransactionDialogComponent, {
        data: data,
        panelClass: 'offline-dialog-container'
      });
    }

}

