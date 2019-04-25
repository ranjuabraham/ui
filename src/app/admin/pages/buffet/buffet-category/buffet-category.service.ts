import { Injectable} from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import { BuffetCategory} from './buffet-category';
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
export class BuffetCategoryService {

  private loadFoodTypeUrl =  'ema/partner/foodType-load';
  private loadItemsUrl = 'ema/partner/buffet-category-load';
  private editItemUrl = '/ema/partner/buffet-category-edit';
  private updateItemsUrl = '/ema/partner/buffet-category-update';

  constructor(private http: HttpClient) { }

  loadItems(prdctDetId: number): Observable<any> {
    const url = `${this.loadItemsUrl}/${prdctDetId}`;
    return this.http.get(url, httpOptions);
  }

  /* load EventList for Display */
  loadItemById(prdctDetId: string, attrId: string): Observable<any> {
    const url = `${this.editItemUrl}/${prdctDetId}/${attrId}`;
    return this.http.get(url, httpOptions);
  }

  /*Update / Add facility to Server */
  updateItem(category: BuffetCategory): Observable<BuffetCategory> {
    return this.http.post<BuffetCategory>(this.updateItemsUrl, category, httpOptions)
    .pipe(map(res => res));
  }

  loadFoodType(prdctDetId: number): Observable<any> {
    const url = `${this.loadFoodTypeUrl}/${prdctDetId}`;
    return this.http.get(url, httpOptions);
  }

}
