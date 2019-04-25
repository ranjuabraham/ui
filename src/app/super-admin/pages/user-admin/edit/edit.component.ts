import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../../shared/notification';
import {UserAdmin} from '../user-admin';
import {UserAdminService} from '../user-admin.service';

export interface SelectBox {
  value: number;
  viewValue: string;
}


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  loading: boolean;
  error: string;
  userAdminData: UserAdmin[];
  public editForm: FormGroup;
  submitted = false;
  venueType: UserAdmin[] = [];
  $usrId = this.route.snapshot.params['usrId'];

  userType: SelectBox[] = [
    {value: 0, viewValue: '--Select--'},
    {value: 1, viewValue: 'Super Admin'},
    {value: 2, viewValue: 'Admin'},
    {value: 3, viewValue: 'End User'}
  ];

  constructor(
    private userAdminService: UserAdminService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
  ) {
    // To initialize FormGroup
    this.editForm = fb.group({
      'usrId': [null, Validators.required],
      'usrTypeId': [null],
      'prdctDetId': [null]
    });
  }

  ngOnInit() {
    this.getUserAdminById();
    this.getVenueDetail();
  }

  // Venue Type from server
  getVenueDetail() {
    this.userAdminService.getVenueDetail()
      .subscribe(type => {
        this.venueType = type;
      });
  }

  getUserAdminById() {
    this.userAdminService.getUserAdminById(this.$usrId)
      .subscribe(heroes => this.userAdminData = heroes);
  }

  mapping() {
    this.submitted = true;
    // // stop here if form is invalid
    if (this.editForm.invalid) {
      return;
    }
    this.loading = true;
    this.userAdminService
      .updateVenueDetails(this.editForm.value)
      .subscribe((value) => {
        this.notificationService.onSuccess('Successfully Updated.');
        this.router.navigateByUrl('/admin/user-admin/show');
          this.loading = false;
        },
        error => {
          this.notificationService.onError('Oops! Something went wrong.');
          this.error = error;
          this.loading = false;
        });
  }
  goBack() {
    this.router.navigate(['/admin/user-admin/show']);
  }


}
