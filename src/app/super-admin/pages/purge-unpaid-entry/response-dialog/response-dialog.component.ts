import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-response-dialog',
  templateUrl: './response-dialog.component.html',
  styleUrls: ['./response-dialog.component.scss']
})
export class ResponseDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ResponseDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, private http: HttpClient, public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  goBack() {
    this.dialogRef.close();
    this.router.navigate(['/admin/dashboard']);
  }
}
