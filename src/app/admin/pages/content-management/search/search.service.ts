import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
// import {HttpErrorHandler, HandleError} from '../../http-error-handler.service';
import {catchError, map} from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable} from 'rxjs';
import { Search } from '../search/search';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchMasterUrl = 'ema/partner/searcher-master';
  private searchShowUrl = 'ema/partner/searcher-load';
  private searchEditUrl = 'ema/partner/searcher-edit';
  private searchUpdateUrl = 'ema/partner/searcher-update';

  constructor(private http: HttpClient) { }

  /* Load Promotion Details from the server */
  loadItems(prdctDetId: number): Observable<any> {
    const url = `${this.searchShowUrl}/${prdctDetId}`;
    return this.http.get(url, httpOptions);
  }

  /* Add / Update Promotion Content */
  updateItems(category: Search): Observable<Search> {
    return this.http.post<Search>(this.searchUpdateUrl, category, httpOptions).map(res => res);
  }

  /* load Promotion for Edit / Update */
  loadItemById(prdctDetId: number, catgId: number, attrId: number): Observable<any> {
    const url = `${this.searchEditUrl}/${prdctDetId}/${catgId}/${attrId}`;
    return this.http.get(url, httpOptions);
  }

  /*load Available Master */
  loadMasters(prdctDetId: number, catgId: number): Observable<any> {
    const url = `${this.searchMasterUrl}/${prdctDetId}/${catgId}`;
    return this.http.get(url, httpOptions);
  }
}
