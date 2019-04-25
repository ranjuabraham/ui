import { Injectable} from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import { VenueFacility} from './venue-facility';
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

export class VenueFacilityService {
  private loadVenueFacilityUrl = 'ema/partner/facility-load';
  private updateVenueFacilityUrl = '/ema/partner/facility-update';
  private editVenueFacilityUrl = '/ema/partner/facility-edit';
  private loadMasterFacility = '/ema/partner/facilities';
  constructor(private http: HttpClient) { }

  /* load existing facilities */
  getFacility(prdctDetId: number): Observable<any> {
    const url = `${this.loadVenueFacilityUrl}/${prdctDetId}`;
    return this.http.get(url, httpOptions);
  }

   /* load facility to Edit */
   getFacilityById(prdctDetId: string, hallId: string, facId: string, attrId: string): Observable<any> {
    const params = new HttpParams()
      .set('prdctDetId', prdctDetId)
      .set('hallId', hallId)
      .set('facId', facId)
      .set('attrId', attrId);
      return this.http.get<VenueFacility[]>(this.editVenueFacilityUrl, {params});
  }

  /*Update / Add facility to Server */
   updateFacilities(category: VenueFacility): Observable<VenueFacility> {
    return this.http.post<VenueFacility>(this.updateVenueFacilityUrl, category, httpOptions)
    .pipe(map(res => res));
  }

  /* Load Facility Master & list of Halls */
  loadFacilityMaster(prdctDetId: number): Observable<any> {
    const url = `${this.loadMasterFacility}/${prdctDetId}`;
    return this.http.get(url, httpOptions);
  }
}
