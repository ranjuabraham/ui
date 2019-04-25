import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {HttpErrorHandler} from '../../../http-error-handler.service';
import {Profile} from './profile';
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
export class ProfileService {

  private profileUrl = '/ema/login/update-profile';
  private editUrl = '/ema/login/load-profile';
  // private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    // this.handleError = httpErrorHandler.createHandleError('VenueCategoryService');
  }

  getProfile(userId: number): Observable<any> {
    const url = `${this.editUrl}/${userId}`;
    return this.http.get(url, httpOptions);
  }

  ///// Save Method //////
  /** POST: add profile form to the database **/
  addProfileForm(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(this.profileUrl, profile, httpOptions);
  }
  private handleError(error: HttpErrorResponse | any) {
    let errMsg: string;
    errMsg = error.error;
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
