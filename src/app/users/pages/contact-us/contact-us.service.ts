import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
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
export class ContactUsService {

  private contactUrl = '/ema/venue/load-contact/0';
  constructor(
    private http: HttpClient) {
  }

  /* GET Contact us from the server */
  contactUs(): Observable<any> {
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
