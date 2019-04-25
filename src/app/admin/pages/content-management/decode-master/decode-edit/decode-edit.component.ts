import { ChangeDetectorRef, Component, OnInit, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { NotificationService} from '../../../../shared/notification';
//import {Captcha} from '../../../../shared/captcha/captcha';
import { DecodeMasterService} from '../decode-master.service';
import { DecodeMaster} from '../decode-master';
import {ActivatedRoute, Params, Router} from '@angular/router';

export interface SequenceItem {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-decode-edit',
  templateUrl: './decode-edit.component.html',
  styleUrls: ['./decode-edit.component.scss']
})
export class DecodeEditComponent implements OnInit {

  public decodeForm: FormGroup;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public usrTypeId = JSON.parse(localStorage.getItem('userInfo')).usrTypeId;
  $prdctDetId  = this.route.snapshot.params['prdctDetId'];
  $attrId  = this.route.snapshot.params['attrId'];
  restItems: any;
  decode: DecodeMaster;
  decodeType: any;
  message = '';
  siteKey: any;
  submitted = false;

  displaySequence: SequenceItem[] = [
    {value: 1, viewValue: '1'},
    {value: 2, viewValue: '2'},
    {value: 3, viewValue: '3'},
    {value: 4, viewValue: '4'},
    {value: 5, viewValue: '5'},
    {value: 6, viewValue: '6'},
    {value: 7, viewValue: '7'},
  ];
  displayStatus: SequenceItem[] = [
    {value: 1, viewValue: 'Active'},
    {value: 2, viewValue: 'De-Active'}
  ];
  constructor(
    private decodeService: DecodeMasterService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    //private captcha: Captcha,
    private cdr: ChangeDetectorRef,
    //private notificationService: NotificationService,
  ) { 
    this.decodeForm = fb.group({
      'dcdeId': [null, Validators.required],
      'dcdeHdr': [''],
      'dcdeDet': [null, Validators.required],
      'dcdeSeq': [null, Validators.required],
      'dcdeAct': [null, Validators.required],
      'action' : ['update'],
      'dcdeTypeId': [null, Validators.required],
      'prdctDetId': [this.$prdctDetId],
      'usrId': [this.userId]
    });
  }

  ngOnInit() {
    this.decodeService.loadItemById(this.$prdctDetId, this.$attrId)
    .subscribe(response => {
      this.restItems = response;
      this.decode = this.restItems.result;
      this.decodeType = this.restItems.decode;
    });
  }

  updateDecode(){
    this.submitted = true;
    if (this.decodeForm.invalid) {
    return;
  }
  this.decodeService.updateItems(this.decodeForm.value)
    .subscribe(response => {
      //this.notificationService.onSuccess('Successfully Updated.');
      this.goBack();
    });
  }

  goBack(){
    this.router.navigate(['/venue/decode/show']);
  }

}
