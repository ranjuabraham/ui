import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Observable} from 'rxjs';
import { Amenities} from './amenities';
import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError} from '../../../../http-error-handler.service';
import { Venue } from 'src/app/users/shared/banner-search/banner-search.component';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})

export class AmenitiesService {
  private loadAmenitiesUrl = 'ema/partner/amenities-load';
  private updateAmenitiesUrl = '/ema/partner/amenities-update';
  private editAmenitiesUrl = '/ema/partner/amenities-edit';
  
  constructor(private http: HttpClient) { }
  
  loadAmenities(prdctDetId: number): Observable<any> {
    const url = `${this.loadAmenitiesUrl}/${prdctDetId}`;
    return this.http.get(url, httpOptions);
  }

  /* load Content for Edit */
  getAmenitiesById(prdctDetId: number, attrId: number): Observable<any> {
    const url = `${this.editAmenitiesUrl}/${prdctDetId}/${attrId}`;
    return this.http.get(url, httpOptions);
  }

  /**ADD / Update Amenities */

  updateAmenities(category: Amenities): Observable<Amenities> {
    return this.http.post<Amenities>(this.updateAmenitiesUrl, category, httpOptions)
    .pipe(map(res => res));
  }

}
