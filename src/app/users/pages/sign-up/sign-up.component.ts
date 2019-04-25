import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../login-dialog/login.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {AuthenticationService} from '../../../_services';
import {ForgotPasswordComponent} from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public signUpForm: FormGroup;
  loginForm: FormGroup;
  public alert = false;
  submitted = false;
  loading = false;
  selectedIndex: number = 0;
  hide = true;
  signUpEmailIdFormControl = new FormControl('', [Validators.required, Validators.email]);
  signUpMobileFormControl = new FormControl('', [Validators.required]);
  signUpPasswordFormControl = new FormControl('', [Validators.required]);
  signUpNameFormControl = new FormControl('', [Validators.required]);
  message: string;
  returnUrl: string;
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private http: HttpClient,
    public dialog: MatDialog,
    private authenticationService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.signUpForm = fb.group({
      usrMobile: this.signUpMobileFormControl,
      signupPassword: this.signUpPasswordFormControl,
      signupEmailId: this.signUpEmailIdFormControl,
      usrFrstName: this.signUpNameFormControl,
      hideRequired: false,
      floatLabel: 'auto',
    });
  }


  ngOnInit() {
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }
  getSignUpEmailErrorMessage() {
    return this.signUpEmailIdFormControl.hasError('required') ? 'Enter your address.' :
      this.signUpEmailIdFormControl.hasError('email') ? 'Invalid email address.' :
        '';
  }
  getSignUpPassError() {
    return this.signUpPasswordFormControl.hasError('required') ? 'Password should be min 8 char.' :
      '';
  }
  getSignUpMobileError() {
    return this.signUpMobileFormControl.hasError('required') ? 'Enter your phone number.' :
      '';
  }
  getSignUpNameError() {
    return this.signUpNameFormControl.hasError('required') ? 'Enter your name.' :
      '';
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
    this.http.post('/ema/login/register', this.signUpForm.value, {responseType: 'text'}).subscribe(res => {
      this.data = res;
      if (this.data === 'SUCCESS') {
        this.selectedIndex = -1;
        this.setTimer();
        this.signUpForm.reset();
      } else {
        this.selectedIndex = 1;
      }
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
  clearSearch() {
    // this.loginForm.reset();
    // this.signUpForm.reset();
    this.signUpForm.setValue({signupEmailId: '', usrFrstName: '', usrMobile: '', signupPassword: '',   hideRequired: false,
      floatLabel: 'auto'});
    console.log('krishna');
  }

}
