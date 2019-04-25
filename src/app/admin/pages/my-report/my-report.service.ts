import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ProductDetails} from "../../../app.models";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MyReportService {

  constructor(private http: HttpClient) { }

  getMyReports(prdctDetId: string, usrId: string, blockType: string, stDt: string, enDt: string ): Observable<any> {
    const url = 'ema/partner/load-date-report';
    const params = new HttpParams()
      .set('prdctDetId', prdctDetId)
      .set('usrId', usrId)
      .set('blockType', blockType)
      .set('stDt', stDt)
      .set('enDt', enDt);
    // console.log(params.toString());
    return this.http.get<any>(url, {params});
  }


}
