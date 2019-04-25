import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { SharedModule} from '../../../shared/shared.module';
// import { NgxEditorModule } from 'ngx-editor';
import { NotificationModule, NotificationService} from '../../../shared/notification';
import { ContactUsShowComponent } from './contact-us-show/contact-us-show.component';
import { ContactUsCreateComponent } from './contact-us-create/contact-us-create.component';
import { ContactUsEditComponent } from './contact-us-edit/contact-us-edit.component';


const routes: Routes = [
  {path: 'create', component: ContactUsCreateComponent},
  {path: 'show', component: ContactUsShowComponent},
  {path: 'edit/:prdctDetId/:attrId', component: ContactUsEditComponent}
  ];

@NgModule({
  declarations: [ContactUsShowComponent, ContactUsCreateComponent, ContactUsEditComponent],
  imports: [
    CommonModule,
    SharedModule,
    // NgxEditorModule,
    HttpClientModule,
    NotificationModule,
    RouterModule.forChild(routes)
  ]
})

export class ContactUsModule { }
