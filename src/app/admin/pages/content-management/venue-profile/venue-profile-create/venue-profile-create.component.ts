import { ChangeDetectorRef, Component, OnInit, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Location} from '@angular/common';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { VenueProfile} from '../venue-profile';
import { VenueProfileService} from '../venue-profile.service';

export interface IndexItem {
  value: string;
  viewValue: string;
}

export interface SequenceItem {
  value: number;
  viewValue: string;
}


@Component({
  selector: 'app-venue-profile-create',
  templateUrl: './venue-profile-create.component.html',
  styleUrls: ['./venue-profile-create.component.scss']
})
export class VenueProfileCreateComponent implements OnInit {
  public profileForm: FormGroup;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public usrTypeId = JSON.parse(localStorage.getItem('userInfo')).usrTypeId;
  
  resultInfo: VenueProfile;
  restItems: any;
  submitted = false;

  displayStatus: SequenceItem[] = [
    {value: 1, viewValue: 'Active'},
    {value: 2, viewValue: 'De-Active'}
  ];

  hallType: SequenceItem[] = [
    {value: 4, viewValue: 'Marriage Halls'},
    {value: 3, viewValue: 'Mini Halls'},
    {value: 7, viewValue: 'Banquet Halls'},
    {value: 2, viewValue: 'Party Halls'},
    {value: 0, viewValue: 'Others'}
  ];

  processType: IndexItem[] = [
    {value: '--Select--', viewValue: '--Select--'},
    {value: 'Offline', viewValue: 'Offline'},
    {value: 'Online', viewValue: 'Online'},
  ];

  constructor(
    private profileService: VenueProfileService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    //private captcha: Captcha,
    private cdr: ChangeDetectorRef,
    //private notificationService: NotificationService
    ){
      this.profileForm = fb.group({
        'action' : ['add'],
        'prdctDetId': [this.prdctDetId],
        'accIfsc': [''],
        'accNo': [''],
        'bankBranch': [''],
        'venueGST': [''],
        'bankName': [''],
        'branchHdr': [null, Validators.required],
        'hallCount': [null, Validators.required],
        'hallTypId': [''],
        'procType': [null, Validators.required],
        'usrId': [this.userId],
        'venContMail': [null, Validators.required],
        'venContMob': [null, Validators.required],
        'venContName': [null, Validators.required],
        'venOwnMail': [''],
        'venOwnMob': [''],
        'venOwnName': [''],
        'venueId': [0],
        'venueHdr': [null, Validators.required],
       });
    }

  ngOnInit() {
    this.loadVenueProfile();
  }

  loadVenueProfile() {
    this.profileService.getProfileInfo(this.prdctDetId)
      .subscribe(response => {
        this.restItems = response;
        if(this.restItems.status == 'SUCCESS'){
          this.resultInfo = this.restItems.result;
        }
        else{
          this.loadCreatePage();
        }
      });
  }

      loadCreatePage(){
        this.router.navigate(['/venue/venue-profile/create']);
      }

      updateProfile()  {
        this.submitted = true;
        // // stop here if form is invalid
        if (this.profileForm.invalid) {
          alert('Some fields are missing');
          return;
        }
        
        this.profileService.updateProfile(this.profileForm.value)
          .subscribe((response) => {
            //this.notificationService.onSuccess('Successfully Added.');
            this.goBack();
          });
      }

      goBack() {
        this.router.navigate(['/venue/venue-profile/show']);
      }

      keyPress(event: any) {
        const pattern = /[0-9\+\-\ ]/;
    
        const inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode !== 8 && !pattern.test(inputChar)) {
          event.preventDefault();
        }
      }

      changeUpperCase(textToUpper: string){
        console.log("textToUpper: "+ textToUpper); 
        var newWord = textToUpper.toUpperCase();
        console.log("The word in upper case: "+ newWord);    
      }

}
