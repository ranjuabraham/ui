import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {LoginDialogComponent} from '../login-dialog/login-dialog.component';
import {emailValidator} from '../../@theme/utils/app-validators';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
   public forgotForm: FormGroup;
  loading =  false;
  public success = false;
   submitted = false;

  selectedIndex = 0;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public dialog: MatDialog,
    public dialogForgot: MatDialogRef<ForgotPasswordComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any) {
    this.forgotForm = fb.group({
      forgotEmailId: ['', Validators.compose([Validators.required, emailValidator, Validators.email, Validators.maxLength(60)])],

    });
  }

  ngOnInit() {
  }
  forgotPassword() {
    this.submitted = true;
    // // stop here if form is invalid
    if (this.forgotForm.invalid) {
      return;
    }
    this.loading = true;
    this.http.post('/ema/login/lost-password', this.forgotForm.value, {responseType: 'text'}).subscribe(res => {
      this.data = res;
      this.loading = false;
      if (this.data === 'SUCCESS') {
        console.log('success123');
        this.dialogForgot.close();
        this.selectedIndex = 0;
        const dialogRef = this.dialog.open(LoginDialogComponent, {
          width: '55%',
          disableClose: true,
          data: {responseVal: this.data, selectedIndex: this.selectedIndex},
          autoFocus: true,
          panelClass: 'login-dialog-box'
        });
      } else {
        console.log('failure');
      }
    });
  }
  closeModalDialog() {
    this.dialogForgot.close();
  }
}
