import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../shared/notification';
import {StateList} from '../profile/profile.component';
import {emailValidator} from '../../@theme/utils/app-validators';

@Component({
  selector: 'app-register-venue',
  templateUrl: './register-venue.component.html',
  styleUrls: ['./register-venue.component.scss']
})
export class RegisterVenueComponent implements OnInit {
   registerVenueForm: FormGroup;
  loading: boolean;
   submitted = false;
   data: any;
  selected = 'option2';
  displaySequence: StateList[] = [
    {viewValue: 'Andaman and Nicobar Islands'},
    {viewValue: 'Andhra Pradesh'},
    {viewValue: 'Arunachal Pradesh'},
    {viewValue: 'Assam'},
    {viewValue: 'Bihar'},
    {viewValue: 'Chandigarh'},
    {viewValue: 'Chhattisgarh'},
    {viewValue: 'Dadra and Nagar Haveli'},
    {viewValue: 'Daman and Diu'},
    {viewValue: 'Delhi'},
    {viewValue: 'Goa'},
    {viewValue: 'Gujarat'},
    {viewValue: 'Haryana'},
    {viewValue: 'Himachal Pradesh'},
    {viewValue: 'Jammu and Kashmir'},
    {viewValue: 'Jharkhand'},
    {viewValue: 'Karnataka'},
    {viewValue: 'Kerala'},
    {viewValue: 'Lakshadweep'},
    {viewValue: 'Madhya Pradesh'},
    {viewValue: 'Maharashtra'},
    {viewValue: 'Manipur'},
    {viewValue: 'Meghalaya'},
    {viewValue: 'Mizoram'},
    {viewValue: 'Nagaland'},
    {viewValue: 'Odisha'},
    {viewValue: 'Pondicherry'},
    {viewValue: 'Punjab'},
    {viewValue: 'Rajasthan'},
    {viewValue: 'Sikkim'},
    {viewValue: 'Tamil Nadu'},
    {viewValue: 'Tripura'},
    {viewValue: 'Uttar Pradesh'},
    {viewValue: 'Uttrakhand'},
    {viewValue: 'West Bengal'},
    {viewValue: 'Army Post Office'},
  ];

  constructor(public fb: FormBuilder,
              public router: Router,
              private route: ActivatedRoute,
              private http: HttpClient,
              private notificationService: NotificationService) {
    this.registerVenueForm = fb.group({
      venueName: [null, Validators.compose([Validators.required, Validators.maxLength(60)])],
      venueArea: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
      venueCity: [null, Validators.compose([Validators.required, Validators.maxLength(30)])],
      venueState: ['Tamil Nadu'],
      cntName: [null, Validators.compose([Validators.required, Validators.maxLength(40)])],
      cntMob: [null, Validators.compose([Validators.required, Validators.minLength(10)])],
      cntMail: ['', Validators.compose([Validators.required, emailValidator, Validators.email, Validators.maxLength(60)])],
      hideRequired: false,
      floatLabel: 'auto',
    });
  }
  ngOnInit() {
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  onSubmit() {
    this.submitted = true;
    // // stop here if form is invalid
    if (this.registerVenueForm.invalid) {
      return;
    }
    this.loading = true;
    this.http.post('/ema/venue/venue-register', this.registerVenueForm.value, {responseType: 'text'}).subscribe(res => {
      this.data = res;
      if (this.data === 'SUCCESS') {
        this.loading = false;
        this.notificationService.onSuccess('Thanks for Interest. We will get back to you at the earliest.');
        // window.location.reload();
        this.router.navigateByUrl('/');
      } else {
        this.loading = false;
        this.notificationService.onError('Oops! Something went wrong.');
      }
    });
  }
}
