import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
// import {HttpErrorHandler, HandleError} from '../../http-error-handler.service';
import {catchError, map} from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable} from 'rxjs';
import { AboutUs} from './about-us';


const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})

export class AboutUsService {
  private aboutShowUrl = 'ema/partner/about-load';
  private aboutEditUrl = 'ema/partner/about-edit';
  private aboutUpdateUrl = 'ema/partner/about-update';

  constructor(private http: HttpClient) { }

    /* Load About Us Details from the server */
    loadAboutUs(prdctDetId: string, userId: string, action: string): Observable<any> {
      const params = new HttpParams()
        .set('prdctDetId', prdctDetId)
        .set('userId', userId)
        .set('action', action);
      return this.http.get<any>(this.aboutShowUrl, {params});
    }

    /* Add / Update about Us Content */
    updateAboutUs(category: AboutUs) {
      return this.http.post<any>(this.aboutUpdateUrl, {responseType: 'text'})
      .pipe(map(res => res));
    }

    /* load Content for Edit */
    getAboutUsById(prdctDetId: number, attrId: number): Observable<any> {
      const url = `${this.aboutEditUrl}/${prdctDetId}/${attrId}`;
      return this.http.get(url, httpOptions);
    }

}
