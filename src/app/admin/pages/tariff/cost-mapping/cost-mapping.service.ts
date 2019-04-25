import { Injectable} from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import { CostMapping} from './cost-mapping';
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

export class CostMappingService {

  private loadMasterUrl =  'ema/partner/tariff-edit';
  private loadItemsUrl = 'ema/partner/tariff-load';
  private editItemUrl = '/ema/partner/tariff-edit';
  private updateItemsUrl = '/ema/partner/tariff-update';

  constructor(private http: HttpClient) { }

  loadItems(prdctDetId: number): Observable<any> {
    const url = `${this.loadItemsUrl}/${prdctDetId}`;
    return this.http.get(url, httpOptions);
  }

  /* load EventList for Display */
  loadItemById(prdctDetId: string, eventId: string): Observable<any> {
    const url = `${this.editItemUrl}/${prdctDetId}/${eventId}`;
    return this.http.get(url, httpOptions);
  }

  /*Update / Add facility to Server */
  updateItem(category: CostMapping): Observable<CostMapping> {
    return this.http.post<CostMapping>(this.updateItemsUrl, category, httpOptions)
    .pipe(map(res => res));
  }

  loadMaster(prdctDetId: number, attrId: number): Observable<any> {
    const url = `${this.loadMasterUrl}/${prdctDetId}/${attrId}`;
    return this.http.get(url, httpOptions);
  }


}
