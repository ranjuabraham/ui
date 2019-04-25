import { Injectable} from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import { Duration} from './duration';
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
export class DurationService {

  private loadEventsUrl =  'ema/partner/events-load';
  private loadItemsUrl = 'ema/partner/duration-load';
  private editItemUrl = '/ema/partner/duration-edit';
  private updateItemsUrl = '/ema/partner/duration-update';

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
  updateItem(category: Duration): Observable<Duration> {
    return this.http.post<Duration>(this.updateItemsUrl, category, httpOptions)
    .pipe(map(res => res));
  }

  loadEvents(prdctDetId: number): Observable<any> {
    const url = `${this.loadEventsUrl}/${prdctDetId}`;
    return this.http.get(url, httpOptions);
  }

}
