import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { SharedModule} from '../../../shared/shared.module';
import { NotificationModule, NotificationService} from '../../../shared/notification';
import { SearchShowComponent } from './search-show/search-show.component';
import { SearchCreateComponent } from './search-create/search-create.component';
import { SearchUpdateComponent } from './search-update/search-update.component';

const routes: Routes = [
  {path: 'create', component: SearchCreateComponent, data: { breadcrumb: 'Create'}},
  {path: 'show', component: SearchShowComponent, data: { breadcrumb: 'Show'}},
  {path: 'edit/:prdctDetId/:catgId/:attrId', component: SearchUpdateComponent, data: { breadcrumb: 'Edit'}},
  ];

@NgModule({
  declarations: [SearchShowComponent, SearchCreateComponent, SearchUpdateComponent],
  imports: [
    CommonModule,
    SharedModule,
    // NgxEditorModule,
    HttpClientModule,
    NotificationModule,
    RouterModule.forChild(routes)
  ]
})
export class SearchModule { }
