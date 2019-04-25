import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {
  }
  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('userInfo');
    // localStorage.removeItem('token');
  }
}
