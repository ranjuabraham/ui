import {ChangeDetectorRef, Component, OnInit, AfterViewInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HelpManagementService} from '../help-management.service';
import {HelpManagement} from '../help-management';

import {NotificationService} from '../../../shared/notification';

export interface HelpManagementItem {
  value: number;
  viewValue: string;
}


@Component({
  selector: 'app-help-create',
  templateUrl: './help-create.component.html',
  styleUrls: ['./help-create.component.scss']
})
export class HelpCreateComponent implements OnInit, AfterViewInit {
  loading: boolean;
  error: string;
  public helpManagementForm: FormGroup;
  displaySequence: HelpManagementItem[] = [
    {value: 1, viewValue: '1'},
    {value: 2, viewValue: '2'},
    {value: 3, viewValue: '3'},
    {value: 4, viewValue: '4'},
    {value: 5, viewValue: '5'},
    {value: 6, viewValue: '6'},
    {value: 7, viewValue: '7'},
  ];
  displayStatus: HelpManagementItem[] = [
    {value: 1, viewValue: 'Active'},
    {value: 2, viewValue: 'De-Active'}
  ];
  submitted = false;
  helpType: HelpManagement[] = [];

  constructor(
    private helpManagementService: HelpManagementService,
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService
  ) {
    // To initialize FormGroup
    this.helpManagementForm = fb.group({
      'helpId': ['0', Validators.required],
      'helpDesc': [null, Validators.required],
      'helpBody': [null, Validators.required],
      'helpSeq': [null, Validators.required],
      'helpAct': [null, Validators.required],
      'helpTypId': [null, Validators.required],
      'captcha': [null, Validators.required]
    });
  }

  ngOnInit() {

    this.getHelpType();
  }

  ngAfterViewInit(): void {
  }

  getHelpType() {
    this.helpManagementService.getHelpType()
      .subscribe(type => {
        this.helpType = type;
      });
  }

  addHelpManagement() {
    this.submitted = true;
    // // stop here if form is invalid
    if (this.helpManagementForm.invalid) {
      return;
    }
    this.loading = true;
    this.helpManagementService
      .addHelpCategory(this.helpManagementForm.value)
      .subscribe((value) => {
          this.notificationService.onSuccess('Successfully Added.');
          this.router.navigateByUrl('/admin/help-management/show');
          this.loading = false;
        },
        error => {
          this.notificationService.onError('Oops! Something went wrong.');
          this.error = error;
          this.loading = false;
        });
  }
// convenience getter for easy access to form fields
  get f() {
    return this.helpManagementForm.controls;
  }

  goBack() {
    this.router.navigate(['/admin/help-management/show']);
  }
}
