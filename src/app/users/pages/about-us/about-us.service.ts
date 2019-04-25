import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {HttpErrorHandler} from '../../../http-error-handler.service';
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
export class AboutUsService {

  private aboutUrl = '/ema/venue/load-about/0';
  constructor(
    private http: HttpClient) {
  }

  /* GET About us from the server */
  aboutUs(): Observable<any> {
    const url = `${this.aboutUrl}`;
    return this.http.get(url, httpOptions);
  }



  private handleError(error: HttpErrorResponse | any) {
    let errMsg: string;
    errMsg = error.error;
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
