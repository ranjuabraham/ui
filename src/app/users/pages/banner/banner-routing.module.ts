import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MarriageHallsComponent} from './marriage-halls/marriage-halls.component';
import {MiniHallsComponent} from './mini-halls/mini-halls.component';
import {PartyHallsComponent} from './party-halls/party-halls.component';
import {BanquetHallsComponent} from './banquet-halls/banquet-halls.component';

const routes: Routes = [
  {path: '', component: MarriageHallsComponent},
  {path: 'search/marriage-halls', component: MarriageHallsComponent},
  {path: 'search/mini-halls', component: MiniHallsComponent},
  {path: 'search/party-halls', component: PartyHallsComponent},
  {path: 'search/banquet-halls', component: BanquetHallsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BannerRoutingModule { }
