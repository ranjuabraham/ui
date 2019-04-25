import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {ResponseDialogComponent} from '../response-dialog/response-dialog.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, private http: HttpClient, public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  submit() {
    this.http.get('/ema/admin/update-unapprove', {responseType: 'text'}).subscribe(res => {
      this.data = res;
      this.dialogRef.close();
      const dialogRef = this.dialog.open(ResponseDialogComponent, {
        disableClose: true,
        data: {responseVal: this.data}
      });
    });
  }

  goBack() {
    this.dialogRef.close();
    this.router.navigate(['/admin/dashboard']);
  }
}
