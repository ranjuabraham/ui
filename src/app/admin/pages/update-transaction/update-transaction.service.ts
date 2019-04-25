import { Injectable} from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import { UpdateTransaction} from './update-transaction';
import 'rxjs/add/operator/catch';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UpdateTransactionService {

  private loadOnlineTransactionUrl = 'ema/partner/load-online-transation';
  private loadOfflineTransactionUrl = 'ema/partner/load-offline-transation';
  private updateOnlineTransactionUrl = 'ema/partner/update-online-transation';
  private loadTransacionByIdUrl =  'ema/partner/load-transaction-edit';
  private updateOfflineTransactionUrl = 'ema/partner/update-offline-transation';

  constructor(private http: HttpClient) {}

  loadTransactions(prdctDetId: number, blockType: number, usrId: number, userType: number): Observable<any> {
    const url = `${this.loadOnlineTransactionUrl}/${prdctDetId}/${blockType}/${usrId}/${userType}`;
    return this.http.get(url, httpOptions);
  }

  loadOfflineTransactions(prdctDetId: number, blockType: number, usrId: number, userType: number): Observable<any> {
    const url = `${this.loadOfflineTransactionUrl}/${prdctDetId}/${blockType}/${usrId}/${userType}`;
    return this.http.get(url, httpOptions);
  }

  loadTransactionById(prdctDetId: number, attrId: string): Observable<any> {
    const url = `${this.loadTransacionByIdUrl}/${prdctDetId}/${attrId}`;
    return this.http.get(url, httpOptions);
  }

  updateTransaction(prdctDetId: string, usrId: string, approvalId: string, txnId: string, status: string): Observable<any> {
    const params = new HttpParams()
      .set('prdctDetId', prdctDetId)
      .set('usrId', usrId)
      .set('txnId', txnId)
      .set('apprId', approvalId)
      .set('status', status);
    return this.http.get<UpdateTransaction[]>(this.updateOnlineTransactionUrl, {params, observe: 'response'});
  }

  updateOfflineTransaction(){

  }


}
