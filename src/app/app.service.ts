import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ModifySearch, PopularHalls, ProductDetails} from './app.models';
// import {Banner} from './users/banner/banner';
import {map} from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};


@Injectable()
export class AppService {

  public userInfo = JSON.parse(localStorage.getItem('userInfo'));

  public marriageHallId = 4;
  public miniHallId = 3;
  public banquetHallId = 7;
  public partyHallId = 2;
  /*------ Home Page --------------- */
  public popularHallsUrl = 'ema/venue/load-popular-halls';
  public getVenueTypeUrl = 'ema/venue/hint-list'; // get city and venue name (param: categoryId)


  /*------ List Page --------------- */
  public getHallFilterUrl = 'ema/venue/load-search-list';
  public getHallsListUrl = 'ema/venue/load-sort-listx';
  public getHallReviewUrl = 'ema/login/load-reviews';
  public addWishListUrl = 'ema/login/update-favourites';
  public getHallGalleryUrl = 'ema/login/load-images';
  public getSubHallsSpecificationUrl = 'ema/login/load-facilities';
  public getModifySearchUrl = 'ema/venue/load-custom-list';
  public getUserWishListUrl = 'ema/login/wishlist';

  /*------ Details Page --------------- */
  public getHallsDetailsUrl = 'ema/venue/load-venue'; // get halls details (param: productId, subHallId)
  public getHighlightsDayUrl = 'ema/venue/load-muhurtham'; // get Highlights day (calender ex.Auspicious Day, Booked)
  public getEventTypeUrl = 'ema/venue/load-book-tariff'; // get Event Type (selectBox ex.Functions, Events)
  public url = 'assets/data/';
  public hallListUrl = 'assets/';

  constructor(public http: HttpClient) {
  }

  /*------------------------ Common Function ---------------------------------------*/

  textValidation(event: any) {
    const pattern = /^[a-zA-Z]+$/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  /*------------------------ Home Page ---------------------------------------*/


  /*------------------------ Home Page ---------------------------------------*/

  /* GET: get popular halls data form serve (slider in home page) */
  public getPopularHalls(): Observable<PopularHalls[]> {
    return this.http.get<PopularHalls[]>(this.popularHallsUrl);
  }

  /* GET: get city and Venue name from the server(param: categoryId) */
  getVenueType(categoryId: number): Observable<any> {
    const url = `${this.getVenueTypeUrl}/${categoryId}`;
    return this.http.get(url);
  }

  /*------------------------ List Page ---------------------------------------*/

  /* GET: get halls filter data form serve (side filter in list page) */
  public getHallFilter(categoryId: number, capacityId: number, priceId: number, areaId: number): Observable<any> {
    const url = `${this.getHallFilterUrl}/${categoryId}/${capacityId}/${priceId}/${areaId}`;
    return this.http.get(url);
  }

  /* GET: get sub halls specification form serve (list page) */
  public getSubHallsSpecification(productId: number, subHallID: number): Observable<any> {
    const url = `${this.getSubHallsSpecificationUrl}/${productId}/${subHallID}`;
    return this.http.get(url);
  }

  // public getHallsLista(categoryId: number, productId: number, capacityId: number, priceId: number,
  //                     areaId: number, pageNo: number, pageCount: number, content: string) {
  //   const url = `${this.getHallsListUrl}/${categoryId}/${productId}/${capacityId}/${priceId}/${areaId}/${pageNo}/${pageCount}/${content}`;
  //   return this.http.get(url, {observe: 'response'});
  // }

  getHallsList(prdctId: string, prdctDetId: string, capacityId: string, priceId: string, areaId: string, pageNo: string, pageCount: string, content: string): Observable<any> {
    const params = new HttpParams()
      .set('prdctId', prdctId)
      .set('prdctDetId', prdctDetId)
      .set('capacityId', capacityId)
      .set('priceId', priceId)
      .set('areaId', areaId)
      .set('pageNo', pageNo)
      .set('pageSize', pageCount)
      .set('content', content);
    return this.http.get(this.getHallsListUrl, {params, observe: 'response'});
  }

  /* GET: get hall review form serve (list page) */
  public getHallReviews(prdctDetId: number) {
    const url = `${this.getHallReviewUrl}/${prdctDetId}`;
    return this.http.get(url);
  }

  /* GET: get hall review form serve (list page) */
  public getMyVenueReviews(prdctDetId: number, userId: number): Observable<any> {
    const url = `${'/ema/login/load-user-reviews'}/${prdctDetId}/${userId}`;
    return this.http.get(url, httpOptions);
  }

  /* GET: get hall gallery images form serve (list page) */
  public getHallGallery(prdctDetId: number) {
    const url = `${this.getHallGalleryUrl}/${prdctDetId}`;
    // return this.http.get(url);
    return this.http.get(url);
  }

  /* GET: add favourites (Wish List) (list page) */
  public addToWishList(userId: number, prdctDetId: number, action: string): Observable<any> {
    const url = `${this.addWishListUrl}/${userId}/${prdctDetId}/${action}`;
    return this.http.get(url, {responseType: 'text'});
  }

  /** POST: search halls data retrieve form serve - list page**/
  modifySearch(modifySearch: ModifySearch): Observable<ModifySearch> {
    return this.http.post<ModifySearch>(this.getModifySearchUrl, modifySearch, httpOptions)
      .pipe(map(res => res));
  }

  /* GET: get user wish list  form serve (list page) */
  public getUserWishList(userId: number) {
    const url = `${this.getUserWishListUrl}/${userId}`;
    return this.http.get(url);
  }

  /* --------------------------------------*****  details page ****--------------------------------------------- */

  /* GET: get halls details from server (parameters: productId, subHallId)*/
  // public getHallsDetailsa(categoryId: number, prdctDetId: number, subHallId) {
  //   const url = `${this.getHallsDetailsUrl}/${prdctDetId}`;
  //   return this.http.get(url, {observe: 'response'});
  // }


  getHallsDetails(prdctDetId: string, subHallId: string, date: string): Observable<any> {
    const params = new HttpParams()
      .set('prdctDetId', prdctDetId)
      .set('subHallId', subHallId)
      .set('date', date);
    // console.log(params.toString());
    return this.http.get<ProductDetails[]>(this.getHallsDetailsUrl, {params, observe: 'response'});
  }

  /* GET: get Highlights day from server (Calender - ex.Auspicious Day, Booked, Partialy Booked)*/
  public getHighlightsDay(productId: string) {
    const url = `${this.getHighlightsDayUrl}/${productId}`;
    return this.http.get(url);
  }

  /* GET: get Event Type from server (Select event type)*/
  // public getEventType(productId: number, subHallId: number, eventDate: string, eventId: number, sessionId: '') {
  //   const url = `${this.getEventTypeUrl}`;
  //   return this.http.get(url, { params: { productId: '', subHallId: '', eventDate: '', EventDate } });
  // }

  getProductDetails(prdctDetId: string, subHallId: string, date: string,
                    eventTypeId: string, sessionId: string, foodId: string, level: string): Observable<ProductDetails[]> {
    const params = new HttpParams()
      .set('prdctDetId', prdctDetId)
      .set('subHallId', subHallId)
      .set('date', date)
      .set('eventTypeId', eventTypeId)
      .set('sessionId', sessionId)
      .set('foodId', foodId)
      .set('level', level);
    // console.log(params.toString());
    return this.http.get<ProductDetails[]>(this.getEventTypeUrl, {params});
  }

  /* --------------------------------------*****  CHOOSE FOOD MENU PAGE ****--------------------------------------------- */

  getFoodMenuList(prdctDetId: string, subHallId: string, foodTypeId: string, bookingId: string): Observable<any> {
    const url = 'ema/venue/load-buffet';
    const params = new HttpParams()
      .set('prdctDetId', prdctDetId)
      .set('subHallId', subHallId)
      .set('foodTypeId', foodTypeId)
      .set('bookingId', bookingId);
    // console.log(params.toString());
    return this.http.get<any>(url, {params});
  }


  /* --------------------------------------*****  checkout details preview page ****--------------------------------------------- */


  getDetailsPreview(productDetId: string, userId: string, bookingId: string): Observable<any> {
    const url = 'ema/venue/load-review-page';
    const params = new HttpParams()
      .set('productDetId', productDetId)
      .set('userId', userId)
      .set('bookingId', bookingId);
    // console.log(params.toString());
    return this.http.get<any>(url, {params});
  }

  /* --------------------------------------*****  approval request page ****--------------------------------------------- */
  getApprovalRequest(userId: string, userType: string, bookingId: string): Observable<any> {
    const url = 'ema/venue/load-book-info';
    const params = new HttpParams()
      .set('userId', userId)
      .set('userType', userType)
      .set('bookingId', bookingId);
    return this.http.get<any>(url, {params});
  }

  /* --------------------------------------*****  approval request page ****--------------------------------------------- */
  getPayNow(userId: string, userType: string, bookingId: string, prdctDetId: string): Observable<any> {
    const url = 'ema/payment/load-payment-info';
    const params = new HttpParams()
      .set('userId', userId)
      .set('userType', userType)
      .set('bookingId', bookingId)
      .set('prdctDetId', prdctDetId);
    return this.http.get<any>(url, {params});
  }

  /* --------------------------------------*****  approval request page ****--------------------------------------------- */
  getPaymentStatus(userId: string, userType: string, bookingId: string): Observable<any> {
    const url = 'ema/payment/load-payment-info';
    const params = new HttpParams()
      .set('userId', userId)
      .set('userType', userType)
      .set('bookingId', bookingId);
    return this.http.get<any>(url, {params});
  }



  private handleError(error: HttpErrorResponse | any) {
    let errMsg: string;
    errMsg = error.error;
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


  public findAndReplace(string, target, replacement) {
    let i = 0;
    const length = string.length;

    for (i; i < length; i++) {

      string = string.replace(target, replacement);

    }
    return string;
  }

}
