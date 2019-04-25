import { Component, OnInit, ViewChild} from '@angular/core';
import 'rxjs/add/observable/of';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource} from '@angular/material';
import { UpdateTransactionService } from '../update-transaction.service'; 
import { UpdateTransaction} from '../update-transaction';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { NotificationService} from '../../../shared/notification';
import { OnlineBookingDialogComponent} from '../online-booking-dialog/online-booking-dialog.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-online-transaction-reservation',
  templateUrl: './online-transaction-reservation.component.html',
  styleUrls: ['./online-transaction-reservation.component.scss']
})
export class OnlineTransactionReservationComponent implements OnInit {

  public userInfo = JSON.parse(localStorage.getItem('userInfo'));
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public userTypeId = JSON.parse(localStorage.getItem('userInfo')).usrTypeId;
  public action = 'load';
  public resultInfo: UpdateTransaction;
  displayedColumns: string[] = ['dcdeHdr', 'bookedOn', 'date', 'duration', 'status', 'action'];
  dataSource: MatTableDataSource<UpdateTransaction>;
  restItems: any;
  blockType: number = 2;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private transactionService: UpdateTransactionService,
    private router: Router,
    public dialog: MatDialog,
    public http: HttpClient,
    private notificationService: NotificationService) { }
 
    ngOnInit() {  
      this.transactionService.loadTransactions(this.prdctDetId, this.blockType, this.userId, this.userTypeId)
      .subscribe(
        response => {
          this.restItems = response;
            if(this.restItems.status == 'SUCCESS') {
            this.dataSource = new MatTableDataSource(this.restItems.result);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.blockType = 2;
          }
          else{
            this.loadErrorPage();
          }
        });
    }

    updateTransaction(prdctDetId: string, usrId: string, txnId: string, status: string){
       this.transactionService.updateTransaction(prdctDetId, usrId, this.userId, txnId, status)
        .subscribe(response => {
          if (response === 'SUCCESS') {
            this.goBack();
            this.notificationService.onSuccess('Successfully Updated.');
          } else {
            this.goBack();
            this.notificationService.onError('Oops! Something went wrong.');
          }
        });
      }

      goBack(){
        this.transactionService.loadTransactions(this.prdctDetId, 2, this.userId, this.userTypeId);
      }

      loadErrorPage(){
        console.log('Not Found')
      }

    showDetails(
      prdctDetId: number,
      txnId: string,
      bookedOn: string,
      dcdeHdr: string,
      muhurtDts: string,
      endDt: string,
      evtName: string,
      durName: string,
      fdTypName: string,
      bookTyp: string,
      rentFinal: number,
      taxesFinal: number,
      disAmount: number,
      reservFinal: number,
      totalFinal: number, 
      isBlk: number,
      buffCount: number,
      buffTar: number,
      bookedBy: string) {
      this.prdctDetId = prdctDetId;
      const dialogRef = this.dialog.open(OnlineBookingDialogComponent, {
        data: {
          prdctDetId: prdctDetId,
          txnId: txnId,
          bookedOn: bookedOn,
          dcdeHdr: dcdeHdr,
          startDate: muhurtDts,
          endDate: endDt,
          evtName: evtName,
          durName: durName,
          fdTypName: fdTypName,
          bookTyp: bookTyp.toLowerCase(),
          rentFinal: rentFinal,
          taxesFinal: taxesFinal,
          disAmount: disAmount,
          reservFinal: reservFinal,
          totalFinal: totalFinal,
          isBlk: isBlk,
          buffCount: buffCount,
          buffTar: buffTar,
          userType: bookedBy.toLowerCase()
        },
        panelClass: 'booking-dialog-container'
      });
    }

}

