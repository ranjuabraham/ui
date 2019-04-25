import { Injectable} from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import { BuffetItems} from './buffet-items';
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
export class BuffetItemsService {
  private loadFoodTypeUrl =  'ema/partner/foodType-load';
  private loadMasterUrl = 'ema/partner/items-master-load'
  private loadItemsUrl = 'ema/partner/buffet-items-load';
  private editItemUrl = '/ema/partner/buffet-items-edit';
  private updateItemsUrl = '/ema/partner/buffet-items-update';

  constructor(private http: HttpClient) { }

  loadItems(prdctDetId: number): Observable<any> {
    const url = `${this.loadItemsUrl}/${prdctDetId}`;
    return this.http.get(url, httpOptions);
  }

  /* load EventList for Display */
  loadItemById(prdctDetId: string, masterId: string, attrId: string): Observable<any> {
    const url = `${this.editItemUrl}/${prdctDetId}/${masterId}/${attrId}`;
    return this.http.get(url, httpOptions);
  }

  /*Update / Add facility to Server */
  updateItem(category: BuffetItems): Observable<BuffetItems> {
    return this.http.post<BuffetItems>(this.updateItemsUrl, category, httpOptions)
    .pipe(map(res => res));
  }

  loadFoodType(prdctDetId: number): Observable<any> {
    const url = `${this.loadFoodTypeUrl}/${prdctDetId}`;
    return this.http.get(url, httpOptions);
  }

  loadItemsMaster(prdctDetId: number, catgId: number): Observable<any> {
    const url = `${this.loadMasterUrl}/${prdctDetId}/${catgId}`;
    return this.http.get(url, httpOptions);
  }

}
