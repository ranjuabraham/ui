import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
// Observable string source
  private dataStringSource = new Subject<string>();
  private data = {};

  // Observable string stream
  dataString$ = this.dataStringSource.asObservable();

  // Service message commands
  insertData(data) {
    this.dataStringSource.next(data);
  }

  setOption(option, value) {
    this.data[option] = value;
  }

  getOption() {
    return this.data;
  }

  setMenuData(option, value) {
    this.data[option] = value;
  }

  getMenuData() {
    return this.data;
  }

  setMarriageHallsData(option, value) {
    this.data[option] = value;
  }

  getMarriageHallsData() {
    return this.data;
  }

  setMiniHallsData(option, value) {
    this.data[option] = value;
  }

  getMiniHallsData() {
    return this.data;
  }

  setBanquetHallsData(option, value) {
    this.data[option] = value;
  }

  getBanquetHallsData() {
    return this.data;
  }

  setPartyHallsData(option, value) {
    this.data[option] = value;
  }

  getPartyHallsData() {
    return this.data;
  }

  /* details page */
  setDetailsPageData(option, value) {
    this.data[option] = value;
  }

  getDetailsPageData() {
    return this.data;
  }
}
