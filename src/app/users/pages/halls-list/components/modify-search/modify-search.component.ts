import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../../../../../app.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Banner} from '../../../banner/banner';
import {BannerService} from '../../../banner/banner.service';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';

export interface State {
  flag: string;
  name: string;
  population: string;
}

@Component({
  selector: 'app-modify-search',
  templateUrl: './modify-search.component.html',
  styleUrls: ['./modify-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ModifySearchComponent implements OnInit {
  modifySearchForm: FormGroup;
  venueType: Banner[] = [];
  submitted = false;
  selectedCity: any;

  constructor(
    public fb: FormBuilder,
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private  bannerService: BannerService,
  ) {
    this.modifySearchForm = this.fb.group({
      venue: [''],
      date: [''],
      venueTypeId: [4]
    });
  }

  ngOnInit() {

    this.getVenueType();
  }

  // Venue Type from server
  getVenueType() {
    this.bannerService.getVenueType()
      .subscribe(type => {
        this.venueType = type;
        // console.log(this.venueType);
      });
  }

  ///// Save Method //////
  /** POST: modify search halls list  from server **/
  onSubmit() {
    this.submitted = true;
    // // stop here if form is invalid
    // if (this.modifySearchForm.invalid) {
    //     //   return;
    //     // }
    console.warn(this.modifySearchForm.value);
    console.log(this.modifySearchForm.value);
    this.appService
      .modifySearch(this.modifySearchForm.value)
      .subscribe((value) => {
        // this.router.navigateByUrl('/admin/venue-category/show');
      });
  }
}
