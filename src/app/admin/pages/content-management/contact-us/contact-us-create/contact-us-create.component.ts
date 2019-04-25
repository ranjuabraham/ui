import { 
  AfterViewInit, 
  ChangeDetectorRef,
  Component,
  ElementRef, OnInit,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { NotificationService} from '../../../../shared/notification';
import { ContactUsService } from '../contact-us.service';


@Component({
  selector: 'app-contact-us-create',
  templateUrl: './contact-us-create.component.html',
  styleUrls: ['./contact-us-create.component.scss']
})
export class ContactUsCreateComponent implements OnInit {

  public contactUsForm : FormGroup;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public usrTypeId = JSON.parse(localStorage.getItem('userInfo')).usrTypeId;

  submitted = false;
  constructor(
    private contactUsService: ContactUsService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService){
   
      this.contactUsForm = fb.group({
        'cntctUsId': ['0'],
        'cntctUsName': [null, Validators.required],
        'cntctUsPhn': [''],
        'cntctUsMob2': [null, Validators.required],
        'city': [null, Validators.required],
        'pincode': [null, Validators.required],
        'cntctUsAddr': [null, Validators.required],
        'cntctUsEmail': [''],
        'cntctUsWeb1': [''],
        'cntctUsTS': [''],
        'cntctUsBus': [null, Validators.required],
        'cntctUsDir': [''],
        'cntctUsGmap': [''],
        'prdctDetId':[250],
        'usrId':[this.userId]

      });
    }

  ngOnInit() {

  }
  
  updateContactDetails(){
    this.submitted = true;
    if (this.contactUsForm.invalid) {
      return;
    }
    this.contactUsService.updateContactDetails(this.contactUsForm.value)
      .subscribe((response) => {
        this.notificationService.onSuccess('Successfully Added.');
        this.router.navigateByUrl('/venue/contact-us/show');
      });
  }

}


