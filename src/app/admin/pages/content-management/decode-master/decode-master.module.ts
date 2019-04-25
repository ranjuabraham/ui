import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { SharedModule} from '../../../shared/shared.module';
import { HttpClientModule} from '@angular/common/http';
import { DecodeShowComponent } from './decode-show/decode-show.component';
import { DecodeCreateComponent } from './decode-create/decode-create.component';
import { DecodeEditComponent } from './decode-edit/decode-edit.component';

const routes: Routes = [
  {path: 'create', component: DecodeCreateComponent},
  {path: 'show', component: DecodeShowComponent},
  {path: 'edit/:prdctDetId/:attrId', component: DecodeEditComponent}
  ];

@NgModule({
  declarations: [DecodeShowComponent, DecodeCreateComponent, DecodeEditComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    //NotificationModule,
    RouterModule.forChild(routes)
  ]
})
export class DecodeMasterModule { }
