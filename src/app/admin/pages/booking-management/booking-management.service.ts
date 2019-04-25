import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BookingManagementService {

  getCheckAvailabilityUrl = '/ema/venue/load-available-dates';

  constructor(private http: HttpClient) { }



  /* GET: get Highlights day from server (Calender - ex.Auspicious Day, Booked, Partialy Booked)*/
  public getCheckAvailable(prdctDetId: number, subHallId: number) {
    const url = `${this.getCheckAvailabilityUrl}/${prdctDetId}/${subHallId}`;
    return this.http.get(url);
  }
}
