import {ChangeDetectorRef, Component, OnInit, AfterViewInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../../../shared/notification';
import {Captcha} from '../../../shared/captcha/captcha';
import {GalleryService} from '../gallery.service';
import {Gallery} from '../gallery';
import {ActivatedRoute, Params, Router} from '@angular/router';

declare var hljs: any;

@Component({
  selector: 'app-gallery-upload',
  templateUrl: './gallery-upload.component.html',
  styleUrls: ['./gallery-upload.component.scss']
})
export class GalleryUploadComponent implements OnInit {
  selectFiles: File = null;
  public message: string;
  public galleryForm: FormGroup;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public usrTypeId = JSON.parse(localStorage.getItem('userInfo')).usrTypeId;
  selectedFile: File = null;
  venueId: string;
  imgURL = '';

  constructor(private galleryService: GalleryService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router,
              //private captcha: Captcha,
              private cdr: ChangeDetectorRef,
              private notificationService: NotificationService,
              private http: HttpClient) {
    this.galleryForm = this.fb.group({
      'prdctDetId': [this.prdctDetId],
      'image': [null, Validators.required]
    });

  }

  ngOnInit() {
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    var mimeType = this.selectedFile.type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return false;
    }
    const size = Math.round(this.selectedFile.size / 1024);
    if (size > 300) {
      this.message = "Please select image size less than 300 kb";
      return false;
    }
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.imgURL = event.target['result'];
        this.message = '';
      };
    }
  }

  onUpload() {
    if(this.selectedFile){
      const fd = new FormData();
      fd.append(this.prdctDetId, this.prdctDetId);
      fd.append('image', this.selectedFile, this.selectedFile.name);
      this.http.post('/ema/partner/gallery-upload', fd, {responseType: 'text'}).subscribe(res => {
        if (res === 'SUCCESS') {
          this.notificationService.onSuccess('Successfully Added.');
          this.router.navigateByUrl('/venue/gallery/show');
        } else {
          this.notificationService.onError('Oops! Something went wrong.');
        }
      });
    } else {
      this.message = "Please fill in the required fields.";
      return false;
    }

  }

  goBack() {
    this.router.navigate(['/venue/gallery/show']);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.galleryForm.controls;
  }

}
