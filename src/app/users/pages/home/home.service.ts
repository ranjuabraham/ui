import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HomeService {
  public url = '';

  constructor(public http: HttpClient) { }

}
