import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { NotificationService} from '../../../../shared/notification';
import { ContactUsService} from '../contact-us.service';
import { ContactUs} from '../contact-us';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-contact-us-edit',
  templateUrl: './contact-us-edit.component.html',
  styleUrls: ['./contact-us-edit.component.scss']
})
export class ContactUsEditComponent implements OnInit {

  public contactUsForm: FormGroup;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public usrTypeId = JSON.parse(localStorage.getItem('userInfo')).usrTypeId;
  $prdctDetId  = this.route.snapshot.params['prdctDetId'];
  $attrId  = this.route.snapshot.params['attrId'];
  contactData: ContactUs;
  submitted = false;

  constructor(
    private contactUsService: ContactUsService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    //private captcha: Captcha,
    //private cdr: ChangeDetectorRef,
    private notificationService: NotificationService,
  ) {
    // To google captcha site key
    //this.siteKey = captcha.siteKey;
    // To initialize FormGroup
    this.contactUsForm = fb.group({
      'cntctUsId': [null, Validators.required],
      'cntctUsName': [null, Validators.required],
      'cntctUsMob2': [null, Validators.required],
      'city': [null, Validators.required],
      'cntctUsEmail': [''],
      'cntctUsWeb1': [''],
      'cntctUsTS': [''],
      'cntctUsBus': [null, Validators.required],
      'cntctUsDir': [''],
      'cntctUsGmap': [''],
      'cntctUsPhn': [''],
      'cntctUsAddr': [null, Validators.required ],
      'pincode': [null, Validators.required],
      'action': ['update'],
      'prdctDetId': [this.$prdctDetId],
      'usrId': [this.userId]
    });
  }

  ngOnInit() {
    this.loadContactUsById();
  }

  loadContactUsById(){
    this.contactUsService.getContactUsById(this.$prdctDetId, this.$attrId)
      .subscribe(heroes => this.contactData = heroes);
  }

  goBack(){
    this.router.navigate(['/venue/contact-us/show']);
  }

  updateContactDetails(){
    this.submitted = true;
    if (this.contactUsForm.invalid) {
      return;
    }
    this.contactUsService.updateContactDetails(this.contactUsForm.value)
      .subscribe((response) => {
        this.notificationService.onSuccess('Successfully Updated.');
        this.router.navigateByUrl('/venue/contact-us/show');
      });
  }

  numericValidation(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  
}
