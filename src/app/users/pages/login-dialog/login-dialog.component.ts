import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from './login.service';
import {Router} from '@angular/router';
import {MatTabChangeEvent} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {ForgotPasswordComponent} from '../forgot-password/forgot-password.component';

import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {AuthenticationService} from '../../../_services';
import {ErrorStateMatcher} from '@angular/material/core';
import {emailValidator} from '../../@theme/utils/app-validators';
import {AppService} from "../../../app.service";


@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
  public signUpForm: FormGroup;
  @ViewChild('signUpForm')
  public signUpForm1: NgForm;
  loginForm: FormGroup;
  public alert = false;
  submitted = false;
  fgtSuccess = false;
  loading = false;
  selectedIndex = 0;
  hide = true;
  message: string;
  validationMsg = false; // for validation message
  passwordMsg = false; // for validation message
  signUpEmailMsg = false; // for validation message
  signUpMsg = false; // for validation message
  mobileNoMsg = false; // for validation message
  returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    public appService: AppService,
    private router: Router,
    private http: HttpClient,
    public dialog: MatDialog,
    private authenticationService: AuthenticationService,
    public dialogLogin: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.signUpForm = fb.group({
      usrMobile: [null, Validators.compose([Validators.required, Validators.minLength(10)])],
      signupPassword: [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20)])],
      signupEmailId: ['', Validators.compose([Validators.required, emailValidator, Validators.email, Validators.maxLength(60)])],
      usrFrstName: ['', Validators.compose([Validators.required, Validators.maxLength(40)])],
      hideRequired: false,
      floatLabel: 'auto',
    });
  }


  ngOnInit() {
    this.loginForm = this.fb.group({
      usrPassword: [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20)])],
      emailId: ['', Validators.compose([Validators.required, emailValidator, Validators.email, Validators.maxLength(60)])],
      hideRequired: false,
      floatLabel: 'auto',
    });
    this.returnUrl = '';
    this.authenticationService.logout();

    if (this.data.responseVal === 'SUCCESS') {
      this.fgtSuccess = true;
      setTimeout(function () {
        this.fgtSuccess = false;
      }.bind(this), 3000);
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  ///// Save Method //////
  /** POST: add a new sign up user to the database **/

  addSignUpForm() {
    this.submitted = true;
    // // stop here if form is invalid
    if (this.signUpForm.invalid) {
      return;
    }
    this.loading = true;
    this.http.post('/ema/login/register', this.signUpForm.value, {responseType: 'text'}).subscribe(res => {
      this.data = res;
      this.loading = false;
      if (this.data === 'SUCCESS') {
        this.selectedIndex = -1;
        this.setTimer();
        this.signUpForm.reset();
      } else if(this.data === 'MAIL') {
        this.selectedIndex = 1;
        this.signUpEmailMsg = true;
        setTimeout(function () {
          this.signUpEmailMsg = false;
        }.bind(this), 5000);
      } else if(this.data === 'MOBILE') {
        this.selectedIndex = 1;
        this.mobileNoMsg = true;
        setTimeout(function () {
          this.mobileNoMsg = false;
        }.bind(this), 5000);
      } else {
        this.selectedIndex = 1;
        this.signUpMsg = true;
        setTimeout(function () {
          this.signUpMsg = false;
        }.bind(this), 5000);
      }
    });
  }

  closeModalDialog() {
    this.dialogLogin.close();
  }

  forgotPassword() {
    this.dialogLogin.close();
    const dialogRef = this.dialog.open(ForgotPasswordComponent, {
      width: '55%',
      disableClose: true,
      panelClass: 'forgot-password-dialog'
    });
  }

  setTimer(): void {
    // show box msg
    this.alert = true;
    // wait 3 Seconds and hide
    setTimeout(function () {
      this.alert = false;
    }.bind(this), 5000);
  }


  login() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      this.loading = true;
      this.http.post('/ema/login/login', this.loginForm.value, {responseType: 'json'}).subscribe(res => {
        this.data = res;
        console.log(res);
        if (this.data.status === 'SUCCESS') {
          this.dialogLogin.close();
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userInfo', JSON.stringify(this.data));
          const userId = JSON.parse(localStorage.getItem('userInfo'));
          this.loading = false;
          window.location.reload();
        } else if (this.data.status === 'PASSWORD') {
          this.passwordMsg = true;
          this.loading = false;
          setTimeout(function () {
            this.passwordMsg = false;
          }.bind(this), 5000);
        } else {
          this.validationMsg = true;
          this.loading = false;
          setTimeout(function () {
            this.validationMsg = false;
          }.bind(this), 5000);
        }
      });
    }
  }

  terms() {
    this.router.navigate(['/terms']);
    this.dialogLogin.close();
  }

  resetForm(event: MatTabChangeEvent) {
    if (event.index === 0) {
      this.signUpForm.reset();
      this.signUpForm.markAsPristine();
      this.signUpForm.markAsUntouched();
      this.signUpForm.updateValueAndValidity();
      this.message = '';
      this.submitted = false;
      // console.log('krishna'); // Or whatever name the method is called
    } else {
      this.loginForm.reset();
      this.loginForm.markAsPristine();
      this.loginForm.markAsUntouched();
      this.loginForm.updateValueAndValidity();
      this.message = '';
      this.submitted = false;
      // console.log('moorthi'); // Or whatever name the method is called
    }
  }
}



