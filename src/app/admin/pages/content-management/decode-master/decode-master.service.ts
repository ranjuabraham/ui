import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
// import {HttpErrorHandler, HandleError} from '../../http-error-handler.service';
import {catchError, map} from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable} from 'rxjs';
import {DecodeMaster} from '../decode-master/decode-master'

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DecodeMasterService {

  private loadDecodeMasterUrl = 'ema/partner/decode-type-load';
  private decodeShowUrl = 'ema/partner/decode-load';
  private decodeEditUrl = 'ema/partner/decode-edit';
  private decodeUpdateUrl = 'ema/partner/decode-update';

  constructor(private http: HttpClient) { }

  /* Load Promotion Details from the server */
  loadItems(prdctDetId: number): Observable<any> {
    const url = `${this.decodeShowUrl}/${prdctDetId}`;
    return this.http.get(url, httpOptions);
  }

  /* Add / Update Promotion Content */
  updateItems(category: DecodeMaster): Observable<DecodeMaster> {
    return this.http.post<DecodeMaster>(this.decodeUpdateUrl, category, httpOptions).map(res => res);
  }

  /* load Promotion for Edit / Update */
  loadItemById(prdctDetId: number, attrId: number): Observable<any> {
    const url = `${this.decodeEditUrl}/${prdctDetId}/${attrId}`;
    return this.http.get(url, httpOptions);
  }

  /* Load Decode Type from server */
  loadDecodeMaster(): Observable<any> {
    const url = `${this.loadDecodeMasterUrl}`;
    return this.http.get(url, httpOptions);
  }

}
