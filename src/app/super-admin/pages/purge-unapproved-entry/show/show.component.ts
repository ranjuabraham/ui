import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  date: string;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    const dialogRef = this.dialog.open(DialogComponent, {disableClose: true,
      data: {}
    });
  }
}
