import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {HttpErrorHandler} from '../../../../http-error-handler.service';
import {Observable} from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class FooterService {

  private contactUrl = '/ema/venue/hd-contact';
  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
  }
  getContact(): Observable<any> {
    const url = `${this.contactUrl}`;
    return this.http.get(url, httpOptions);
  }
  private handleError(error: HttpErrorResponse | any) {
    let errMsg: string;
    errMsg = error.error;
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
