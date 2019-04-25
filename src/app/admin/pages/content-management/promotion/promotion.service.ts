import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable} from 'rxjs';
import { Promotion } from '../promotion/promotion';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  private promoShowUrl = 'ema/partner/promotion-load';
  private promoEditUrl = 'ema/partner/promotion-edit';
  private promoUpdateUrl = 'ema/partner/promotion-update';

  constructor(private http: HttpClient) { }

  /* Load Promotion Details from the server */
  loadItems(prdctDetId: number): Observable<any> {
    const url = `${this.promoShowUrl}/${prdctDetId}`;
    return this.http.get(url, httpOptions);
  }

  /* Add / Update Promotion Content */
  updateItems(category: Promotion): Observable<Promotion> {
    return this.http.post<Promotion>(this.promoUpdateUrl, category, httpOptions).map(res => res);
  }

  /* load Promotion for Edit / Update */
  loadItemById(prdctDetId: number, attrId: number): Observable<any> {
    const url = `${this.promoEditUrl}/${prdctDetId}/${attrId}`;
    return this.http.get(url, httpOptions);
  }
}
