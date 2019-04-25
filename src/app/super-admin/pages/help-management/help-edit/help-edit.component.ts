import {ChangeDetectorRef, Component, OnInit, AfterViewInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HelpManagement} from '../help-management';
import {HelpManagementService} from '../help-management.service';
import {NotificationService} from '../../../shared/notification';
export interface HelpCategoryItem {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-help-edit',
  templateUrl: './help-edit.component.html',
  styleUrls: ['./help-edit.component.scss']
})
export class HelpEditComponent implements OnInit, AfterViewInit {
  loading: boolean;
  error: string;
  helpManagementData: HelpManagement[];
  message = '';
  public helpManagementForm: FormGroup;
  submitted = false;
  $helpId = this.route.snapshot.params['helpId'];
  displaySequence: HelpCategoryItem[] = [
    {value: 1, viewValue: '1'},
    {value: 2, viewValue: '2'},
    {value: 3, viewValue: '3'},
    {value: 4, viewValue: '4'},
    {value: 5, viewValue: '5'},
    {value: 6, viewValue: '6'},
    {value: 7, viewValue: '7'},
  ];
  displayStatus: HelpCategoryItem[] = [
    {value: 1, viewValue: 'Active'},
    {value: 2, viewValue: 'De-Active'}
  ];
  helpType: HelpManagement[] = [];
  constructor(
    private helpManagementService: HelpManagementService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService
  ) {
    // To initialize FormGroup
    this.helpManagementForm = fb.group({
      'helpId': [null, Validators.required],
      'helpDesc': [null, Validators.required],
      'helpBody': [null, Validators.required],
      'helpSeq': [null, Validators.required],
      'helpAct': [null, Validators.required],
      'helpTypId': [null, Validators.required],
      'captcha': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getHelpManagementById();
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
  getHelpManagementById() {
    this.helpManagementService.getHelpById(this.$helpId)
      .subscribe(heroes => this.helpManagementData = heroes);
  }

  editHelpManagement() {
    this.submitted = true;
    // // stop here if form is invalid
    if (this.helpManagementForm.invalid) {
      return;
    }
    this.loading = true;
    this.helpManagementService
      .updateHelpCategory(this.helpManagementForm.value)
      .subscribe((value) => {this.notificationService.onSuccess('Successfully Updated.');
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
