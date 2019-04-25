import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProfileService} from './profile.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Profile} from './profile';
import {HttpClient} from '@angular/common/http';
import {MatTabChangeEvent} from '@angular/material';
import {NotificationService} from "../../shared/notification";

export interface StateList {
  // value: number;
  viewValue: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public emailId = JSON.parse(localStorage.getItem('userInfo')).emailId;
  public mobileNumber = JSON.parse(localStorage.getItem('userInfo')).usrMobile;
  firstNameFormControl = new FormControl('', [Validators.required]);
  cityFormControl = new FormControl('', [Validators.required]);
  stateFormControl = new FormControl('', [Validators.required]);
  zipcodeFormControl = new FormControl('', [Validators.required]);
  action: any;
  public defaultAction = 'add';
  $getUserId = this.route.snapshot.params['usrId'];
  submitted = false;
  public alert = false;
  data: any;
  test: any;
  profileData: Profile[];
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

  constructor(
    public fb: FormBuilder,
    public profileService: ProfileService,
    public router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private notificationService: NotificationService
  ) {
    this.profileForm = fb.group({
      addrName: ['', Validators.required],
      lastName: [''],
      addrPh: [null, Validators.compose([Validators.minLength(6), Validators.maxLength(12)])],
      mobileNumber: [''],
      addrStr: [''],
      addrCity: [null, Validators.required],
      addrState: [null, Validators.required],
      addrZip: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      address: ['', Validators.compose([Validators.maxLength(250)])],
      addrId: [0],
      action: [''],
      usrId: [this.userId],
      emailId: [this.emailId],
      hideRequired: false,
      floatLabel: 'auto',
    });
  }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.profileService.getProfile(this.userId)
      .subscribe(data => {
        this.profileData = data;
        this.test = JSON.parse(localStorage.getItem('userInfo'));
        // console.log(this.test);
        // console.log('krishna test');
      });
    // console.log(this.profileData);
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  setTimer(): void {
    // show box msg
    this.alert = true;
    // wait 3 Seconds and hide
    setTimeout(function () {
      this.alert = false;
    }.bind(this), 10);
  }

  addProfileForm() {
    this.submitted = true;
    // // stop here if form is invalid
    if (this.profileForm.invalid) {
      return;
    }
    // console.warn(this.venueCategoryForm.value);
    this.http.post('/ema/login/update-profile', this.profileForm.value, {responseType: 'text'}).subscribe(res => {
      this.data = res;
      // this.setTimer();
      if (this.data === 'SUCCESS') {
        this.setTimer();
        this.notificationService.onSuccess('Successfully Added.');
        this.router.navigateByUrl('/profile');
      } else {
        this.notificationService.onError('Oops! Something went wrong.');
      }
    });
  }


  resetForm(event: MatTabChangeEvent) {
    // this.profileForm.reset();
    this.profileForm.controls['addrName'].reset();
    this.profileForm.controls['lastName'].reset();
    this.profileForm.controls['addrPh'].reset();
    this.profileForm.controls['addrStr'].reset();
    this.profileForm.controls['addrCity'].reset();
    this.profileForm.controls['addrState'].reset();
    this.profileForm.controls['addrZip'].reset();
    this.profileForm.controls['address'].reset();
    this.profileForm.markAsPristine();
    this.profileForm.markAsUntouched();
    this.profileForm.updateValueAndValidity();
    // console.log('krishna'); // Or whatever name the method is called
  }

}
