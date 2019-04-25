import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from '../_guards';

const routes: Routes = [
  {path: '', loadChildren: '../users/pages/auth/auth.module#AuthModule'},
  {path: 'admin', loadChildren: '../super-admin/pages/auth/auth.module#AuthModule', canActivate: [AuthGuard] },
  {path: 'venue', loadChildren: '../admin/pages/auth/auth.module#AuthModule', canActivate: [AuthGuard] },
  {path: 'venue-admin', loadChildren: '../admin-booking/pages/auth/auth.module#AuthModule', canActivate: [AuthGuard] },
  // { path: '**', pathMatch: 'full', redirectTo: '' } // catch any unfound routes and redirect to home page
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled',  anchorScrolling: 'enabled'})],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class LazyLoadModule {
}
