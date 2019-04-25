import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { VenueProfile} from '../venue-profile/venue-profile';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class VenueProfileService {

  private profileShowUrl = 'ema/partner/venue-profile';
  private profileUpdateUrl = 'ema/partner/venue-profile-update';

  constructor(private http: HttpClient) { }

  /* GET Venue Details from the server */
  getProfileInfo(prdctDetId: number): Observable<any> {
    const url = `${this.profileShowUrl}/${prdctDetId}`;
    return this.http.get(url, httpOptions);
  }

  updateProfile(category: VenueProfile): Observable<VenueProfile> {
    return this.http.post<VenueProfile>(this.profileUpdateUrl, category, httpOptions)
    .pipe(map(res => res));
  }

}
