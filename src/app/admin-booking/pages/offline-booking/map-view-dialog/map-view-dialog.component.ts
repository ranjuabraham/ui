import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

export interface GoogleMap {
  googleMap: string;
}
@Component({
  selector: 'app-map-view-dialog',
  templateUrl: './map-view-dialog.component.html',
  styleUrls: ['./map-view-dialog.component.scss']
})
export class MapViewDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MapViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GoogleMap, public sanitizer: DomSanitizer) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
