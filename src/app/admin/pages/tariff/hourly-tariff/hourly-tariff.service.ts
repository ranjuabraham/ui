import { Injectable} from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import { HourlyTariff} from './hourly-tariff';
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
export class HourlyTariffService {
  
  private loadHallListUrl = 'ema/partner/halls-load';
  private loadHourlyUrl = 'ema/partner/hourly-cost-load';
  private editHourlyUrl = '/ema/partner/hourly-cost-edit';
  private updateHourlyUrl = '/ema/partner/hourly-cost-update';
  
  constructor(private http: HttpClient) {

  }

  /* Load Reservation for Display */
  loadItems(prdctDetId: number): Observable<any> {
    const url = `${this.loadHourlyUrl}/${prdctDetId}`;
    return this.http.get(url, httpOptions);
  }

  /* Edit Reservation*/
  loadItemById(prdctDetId: string, attrId: string): Observable<any> {
    const url = `${this.editHourlyUrl}/${prdctDetId}/${attrId}`;
    return this.http.get(url, httpOptions);
  }

  /*Update / Add Reservation */
  updateItems(category: HourlyTariff): Observable<HourlyTariff> {
    return this.http.post<HourlyTariff>(this.updateHourlyUrl, category, httpOptions)
    .pipe(map(res => res));
  }

   /* Load Required Masters */
   loadMasters(prdctDetId: number): Observable<any> {
    const url = `${this.loadHallListUrl}/${prdctDetId}`;
    return this.http.get(url, httpOptions);
  }

}