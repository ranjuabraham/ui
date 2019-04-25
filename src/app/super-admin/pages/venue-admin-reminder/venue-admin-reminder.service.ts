import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {VenueAdminReminder} from './venue-admin-reminder';

@Injectable({
  providedIn: 'root'
})
export class VenueAdminReminderService {

  private showUrl = 'ema/admin/load-reminder';
  dialogData: any;

  constructor(
    private http: HttpClient) {
  }

  /* GET Venue Details from the server */
  getVenueAdminRemainder(): Observable<VenueAdminReminder[]> {
    return this.http.get<VenueAdminReminder[]>(this.showUrl);
  }
  
}
