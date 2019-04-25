import { Injectable} from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import { Events} from './events';
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

export class EventsService {

  private loadHallListUrl = 'ema/partner/halls-load';
  private loadEventsUrl = 'ema/partner/events-load';
  private editEventsUrl = '/ema/partner/events-edit';
  private updateEventsUrl = '/ema/partner/events-update';
  
  constructor(private http: HttpClient) {

   }

  /* load EventList for Display */
  loadEvents(prdctDetId: number): Observable<any> {
    const url = `${this.loadEventsUrl}/${prdctDetId}`;
    return this.http.get(url, httpOptions);
  }

  /* load EventList for Display */
  loadEventById(prdctDetId: string, eventId: string): Observable<any> {
    const url = `${this.editEventsUrl}/${prdctDetId}/${eventId}`;
    return this.http.get(url, httpOptions);
  }

  /*Update / Add facility to Server */
  updateEvents(category: Events): Observable<Events> {
    return this.http.post<Events>(this.updateEventsUrl, category, httpOptions)
    .pipe(map(res => res));
  }

   /* load EventList for Display */
   loadHallList(prdctDetId: number): Observable<any> {
    const url = `${this.loadHallListUrl}/${prdctDetId}`;
    return this.http.get(url, httpOptions);
  }

}
