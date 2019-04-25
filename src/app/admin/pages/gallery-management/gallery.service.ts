import { Injectable} from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import { Gallery} from './gallery';
// import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError} from '../../../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})

export class GalleryService {
  
  private loadMasterUrl =  'ema/partner/halls-load';
  private loadItemsUrl = 'ema/partner/gallery-load';
  private editItemUrl = '/ema/partner/gallery-edit';
  private updateItemsUrl = '/ema/partner/gallery-update';
  private uploadItemsUrl = '/ema/partner/gallery-upload';

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
  updateItem(category: Gallery): Observable<Gallery> {
    return this.http.post<Gallery>(this.updateItemsUrl, category, httpOptions)
    .pipe(map(res => res));
  }

  /*Upload Image to server */ 
  uploadImage(category: Gallery): Observable<Gallery> {
    return this.http.post<Gallery>(this.uploadItemsUrl, category, httpOptions)
    .pipe(map(res => res));
  }

  loadEvents(prdctDetId: number): Observable<any> {
    const url = `${this.loadMasterUrl}/${prdctDetId}`;
    return this.http.get(url, httpOptions);
  }

}
