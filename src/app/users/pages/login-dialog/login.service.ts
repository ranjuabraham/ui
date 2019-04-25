import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {HttpErrorHandler, HandleError} from '../../../http-error-handler.service';
import {Observable} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Login} from './login';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private signUpUrl = '/ema/login/register';
  // private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    // this.handleError = httpErrorHandler.createHandleError('VenueCategoryService');
  }

  ///// Save Method //////
  /** POST: add a new Sign Up form to the database **/
  addSignInForm(signUp: Login): Observable<Login> {
    return this.http.post<Login>(this.signUpUrl, signUp, httpOptions);
  }
  private handleError(error: HttpErrorResponse | any) {
    let errMsg: string;
    errMsg = error.error;
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
