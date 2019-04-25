import { Injectable} from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import { BuffetMaster} from './buffet-master';
// import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError} from '../../../../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BuffetMasterService {

  private loadFoodTypeUrl =  'ema/partner/foodType-load';
  private loadItemsUrl = 'ema/partner/buffet-master-load';
  private editItemUrl = '/ema/partner/buffet-master-edit';
  private updateItemsUrl = '/ema/partner/buffet-master-update';

  constructor(private http: HttpClient) { }
  
  /* load Items to Display */
  loadItems(prdctDetId: number): Observable<any> {
    const url = `${this.loadItemsUrl}/${prdctDetId}`;
    return this.http.get(url, httpOptions);
  }

  /* load Items for Edit */
  loadItemById(prdctDetId: string, attrId: string): Observable<any> {
    const url = `${this.editItemUrl}/${prdctDetId}/${attrId}`;
    return this.http.get(url, httpOptions);
  }

  /* Update / Add Items to Server */
  updateItem(category: BuffetMaster): Observable<BuffetMaster> {
    return this.http.post<BuffetMaster>(this.updateItemsUrl, category, httpOptions)
    .pipe(map(res => res));
  }

  /* Load Master Content */
  loadFoodType(prdctDetId: number): Observable<any> {
    const url = `${this.loadFoodTypeUrl}/${prdctDetId}`;
    return this.http.get(url, httpOptions);
  }

}
