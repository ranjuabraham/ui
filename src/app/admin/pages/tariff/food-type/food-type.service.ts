import { Injectable} from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import { FoodType} from './food-type';
// import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError} from '../../../../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class FoodTypeService {

  private loadFdTypeUrl = 'ema/partner/foodType-load';
  private editFdTypeUrl = '/ema/partner/foodType-edit';
  private updateFdTypeUrl = '/ema/partner/foodType-update';
  
  constructor(private http: HttpClient) {
   }
   
  /* load EventList for Display */
  loadItems(prdctDetId: number): Observable<any> {
    const url = `${this.loadFdTypeUrl}/${prdctDetId}`;
    return this.http.get(url, httpOptions);
  }

  /* load EventList for Display */
  loadItemById(prdctDetId: string, itemId: string): Observable<any> {
    const url = `${this.editFdTypeUrl}/${prdctDetId}/${itemId}`;
    return this.http.get(url, httpOptions);
  }

  /*Update / Add facility to Server */
  updateItems(category: FoodType): Observable<FoodType> {
    return this.http.post<FoodType>(this.updateFdTypeUrl, category, httpOptions)
    .pipe(map(res => res));
  }

}
