import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
// import {HttpErrorHandler, HandleError} from '../../http-error-handler.service';
import {catchError, map} from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable} from 'rxjs';
import { ContactUs} from './contact-us';


const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})

export class ContactUsService {

  private contactShowUrl = 'ema/partner/contact-load';
  private contactEditUrl = 'ema/partner/contact-edit';
  private contactUpdateUrl = 'ema/partner/contact-update';

  constructor(private http: HttpClient) { }

    /* Load About Us Details from the server */
    loadContactUs(prdctDetId: string, userId: string, action: string): Observable<any> {
      const params = new HttpParams()
        .set('prdctDetId', prdctDetId)
        .set('userId', userId)
        .set('action', action);
      return this.http.get<any>(this.contactShowUrl, {params});
    }

    /* Add / Update about Us Content */
    updateContactDetails(category: ContactUs): Observable<ContactUs> {
      return this.http.post<ContactUs>(this.contactUpdateUrl, category, httpOptions).map(res => res);
    }

    /* load Content for Edit */
    getContactUsById(prdctDetId: number, attrId: number): Observable<any> {
      const url = `${this.contactEditUrl}/${prdctDetId}/${attrId}`;
      return this.http.get(url, httpOptions);
    }

}

