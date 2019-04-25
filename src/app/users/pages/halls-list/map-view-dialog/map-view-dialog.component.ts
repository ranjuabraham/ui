import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {GoogleMap} from '../marriage-halls/marriage-halls.component';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-map-view-dialog',
  templateUrl: './map-view-dialog.component.html',
  styleUrls: ['./map-view-dialog.component.scss']
})
export class MapViewDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MapViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GoogleMap, public sanitizer: DomSanitizer) {}

  dialogClose(): void {
    this.dialogRef.close();
  }
}
