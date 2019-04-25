import { Injectable} from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import { PaxCount} from './pax-count';
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
export class PaxCountService {

  private loadHallListUrl = 'ema/partner/halls-load';
  private loadPaxCounUrl = 'ema/partner/pax-count-load';
  private editPaxCountUrl = '/ema/partner/pax-count-edit';
  private updatePaxCountUrl = '/ema/partner/pax-count-update';
  
  constructor(private http: HttpClient) {

  }

  /* Load Reservation for Display */
  loadItems(prdctDetId: number): Observable<any> {
    const url = `${this.loadPaxCounUrl}/${prdctDetId}`;
    return this.http.get(url, httpOptions);
  }

  /* Edit Reservation*/
  loadItemById(prdctDetId: string, attrId: string): Observable<any> {
    const url = `${this.editPaxCountUrl}/${prdctDetId}/${attrId}`;
    return this.http.get(url, httpOptions);
  }

  /*Update / Add Reservation */
  updateItems(category: PaxCount): Observable<PaxCount> {
    return this.http.post<PaxCount>(this.updatePaxCountUrl, category, httpOptions)
    .pipe(map(res => res));
  }

   /* Load Required Masters */
   loadMasters(prdctDetId: number): Observable<any> {
    const url = `${this.loadHallListUrl}/${prdctDetId}`;
    return this.http.get(url, httpOptions);
  }

}