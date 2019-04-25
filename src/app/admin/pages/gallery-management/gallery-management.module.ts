import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import { SharedModule} from '../../shared/shared.module';
import { NgxCaptchaModule } from 'ngx-captcha';
import { Captcha} from '../../shared/captcha/captcha';
import { MatButtonToggleModule, MatDialogModule } from '@angular/material';
import { NotificationModule, NotificationService} from '../../shared/notification';
import { GalleryShowComponent } from './gallery-show/gallery-show.component';
import { GalleryUpdateComponent } from './gallery-update/gallery-update.component';
import { GalleryUploadComponent } from './gallery-upload/gallery-upload.component';


const routes: Routes = [
  {path: 'upload', component: GalleryUploadComponent, data: { breadcrumb: 'Upload'}},
  {path: 'show', component: GalleryShowComponent, data: { breadcrumb: 'Show'}},
  {path: 'edit/:prdctDetId/:attrId', component: GalleryUpdateComponent, data: { breadcrumb: 'Edit'}}];

@NgModule({
  declarations: [GalleryShowComponent, GalleryUpdateComponent, GalleryUploadComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    NotificationModule,
    RouterModule.forChild(routes)
  ]
})
export class GalleryManagementModule { }
