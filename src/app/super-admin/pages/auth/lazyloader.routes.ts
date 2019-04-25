import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth.component';
import {DashboardComponent} from '../dashboard/dashboard.component';


export const appRoutes: Routes = [{
  path: '', component: AuthComponent, children: [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'venue-category', loadChildren: '../venue-management/venue-category/venue-category.module#VenueCategoryModule', data: {breadcrumb: 'Venue Category'}},
    {path: 'venue-details', loadChildren: '../venue-management/venue-details/venue-details.module#VenueDetailsModule'},
    {path: 'search-category', loadChildren: '../search-management/search-category/search-category.module#SearchCategoryModule'},
    {path: 'search-details', loadChildren: '../search-management/search-details/search-details.module#SearchDetailsModule'},
    {path: 'muhurtham-dates', loadChildren: '../muhurtham-dates/muhurtham-dates.module#MuhurthamDatesModule'},
    {path: 'purge-data', loadChildren: '../purge-data/purge-data.module#PurgeDataModule'},
    {path: 'purge-unapproved-entry', loadChildren: '../purge-unapproved-entry/purge-unapproved-entry.module#PurgeUnapprovedEntryModule'},
    {path: 'purge-unpaid-entry', loadChildren: '../purge-unpaid-entry/purge-unpaid-entry.module#PurgeUnpaidEntryModule'},
    {path: 'remove-test-bookings', loadChildren: '../remove-test-bookings/remove-test-bookings.module#RemoveTestBookingsModule'},
    {path: 'venue-admin-reminder', loadChildren: '../venue-admin-reminder/venue-admin-reminder.module#VenueAdminReminderModule'},
    {path: 'process-reviews', loadChildren: '../process-reviews/process-reviews.module#ProcessReviewsModule'},
    {path: 'user-admin', loadChildren: '../user-admin/user-admin.module#UserAdminModule'},
    {path: 'reconcile-report', loadChildren: '../reconcile-report/reconcile-report.module#ReconcileReportModule'},
    {path: 'report', loadChildren: '../report/report.module#ReportModule'},
    {path: 'facilities-category', loadChildren: '../facilities-management/facilities-category/facilities-category.module#FacilitiesCategoryModule'},
    {path: 'help-management', loadChildren: '../help-management/help-management.module#HelpManagementModule'},
  ]
}];
