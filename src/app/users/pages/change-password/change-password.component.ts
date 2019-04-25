import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {CustomValidators} from './custom-validators';
import {MatTabChangeEvent} from '@angular/material';
import {NotificationService} from "../../shared/notification";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  registrationFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  loading: boolean;
  hide = true;
  submitted = false;
  data: any;
  oldPasswd: string;
  successMsg = false;
  errorMsg = false;
  message;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public emailId = JSON.parse(localStorage.getItem('userInfo')).emailId;
  public mobileNumber = JSON.parse(localStorage.getItem('userInfo')).usrMobile;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private notificationService: NotificationService,
              private http: HttpClient) {
    this.registrationFormGroup = this.formBuilder.group({
        oldPasswd: ['', Validators.required],
        usrPassword: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
        repeatPassword: ['', Validators.compose([Validators.required])],
        emailId: [this.emailId],
        userId: [this.userId],
        mobileNumber: [this.mobileNumber],
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator
      });
  }

  ngOnInit() {
  }

  changePassword() {
    this.submitted = true;
    // // stop here if form is invalid
    if (this.registrationFormGroup.invalid) {
      return;
    }
    this.loading =  true;
    if (this.registrationFormGroup.value['oldPasswd']  === this.registrationFormGroup.value['usrPassword']){
      this.message = "Your old and new password should not be same";
      setTimeout(function () {
        this.message = "";
      }.bind(this), 3000);

    }
    this.http.post('/ema/login/change-password', this.registrationFormGroup.value, {responseType: 'text'}).subscribe(res => {
      this.data = res;
      this.loading =  false;
      if (this.data === 'SUCCESS') {
        this.successMsg = true;
        setTimeout(function () {
          this.successMsg = false;
          window.location.reload();
        }.bind(this), 3000);
      } else if (this.data === 'FAILURE') {
        this.errorMsg = true;
        setTimeout(function () {
          this.errorMsg = false;
        }.bind(this), 3000);
      } else {
        this.notificationService.onError('Oops! Something went wrong. Please try again later.');
      }
    });
  }

  resetForm(): void {
    this.registrationFormGroup.reset();
    this.registrationFormGroup.markAsPristine();
    this.registrationFormGroup.markAsUntouched();
    this.registrationFormGroup.updateValueAndValidity();
  }
}


function matchingPasswords(usrPasswordKey: string, repeatPasswordKey: string) {
  return (group: FormGroup): { [key: string]: any } => {
    const usrPassword = group.controls[usrPasswordKey];
    const repeatPassword = group.controls[repeatPasswordKey];

    if (usrPassword.value !== repeatPassword.value) {
      return {
        mismatchedPasswords: true
      };
    }
  };
}
