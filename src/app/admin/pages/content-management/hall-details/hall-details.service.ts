import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable} from 'rxjs';
import { HallDetails} from '../hall-details/hall-details';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class HallDetailsService {

  private hallDetailsShowUrl = 'ema/partner/hall-details-load';
  private hallDetailsEditUrl = 'ema/partner/hall-details-edit';
  private hallDetailsUpdateUrl = 'ema/partner/hall-details-update';

  constructor(private http: HttpClient) { }

  /* Load Hall Details from the server */
  loadItems(prdctDetId: number): Observable<any> {
    const url = `${this.hallDetailsShowUrl}/${prdctDetId}`;
    return this.http.get(url, httpOptions);
  }

  /* Add / Update Hall Details */
  updateItems(category: HallDetails): Observable<HallDetails> {
    return this.http.post<HallDetails>(this.hallDetailsUpdateUrl, category, httpOptions).map(res => res);
  }

  /* load Hall Details for Edit / Update */
  loadItemById(prdctDetId: number, attrId: number): Observable<any> {
    const url = `${this.hallDetailsEditUrl}/${prdctDetId}/${attrId}`;
    return this.http.get(url, httpOptions);
  }


}
