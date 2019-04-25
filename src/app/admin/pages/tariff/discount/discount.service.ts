import { Injectable} from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import { Discount} from './discount';
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

export class DiscountService {

  private loadHallListUrl = 'ema/partner/halls-load';
  private loadDiscountUrl = 'ema/partner/discount-load';
  private editDiscountUrl = '/ema/partner/discount-edit';
  private updateDiscountUrl = '/ema/partner/discount-update';
  
  constructor(private http: HttpClient) {

  }

  /* Load Reservation for Display */
  loadItems(prdctDetId: number): Observable<any> {
    const url = `${this.loadDiscountUrl}/${prdctDetId}`;
    return this.http.get(url, httpOptions);
  }

  /* Edit Reservation*/
  loadItemById(prdctDetId: string, attrId: string): Observable<any> {
    const url = `${this.editDiscountUrl}/${prdctDetId}/${attrId}`;
    return this.http.get(url, httpOptions);
  }

  /*Update / Add Reservation */
  updateItems(category: Discount): Observable<Discount> {
    return this.http.post<Discount>(this.updateDiscountUrl, category, httpOptions)
    .pipe(map(res => res));
  }

   /* Load Required Masters */
   loadMasters(prdctDetId: number): Observable<any> {
    const url = `${this.loadHallListUrl}/${prdctDetId}`;
    return this.http.get(url, httpOptions);
  }

}