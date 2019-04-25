import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth.component';
import {DashboardComponent} from '../dashboard/dashboard.component';


export const appRoutes: Routes = [{
  path: '', component: AuthComponent, children: [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'content-management', loadChildren: '../content-management/about-us/about-us.module#AboutUsModule', data: { breadcrumb: 'Content Management'}},
    {path: 'contact-us', loadChildren: '../content-management/contact-us/contact-us.module#ContactUsModule',  data: { breadcrumb: 'Contact Us' }},
    {path: 'facilities', loadChildren: '../content-management/venue-facility/venue-facility.module#VenueFacilityModule', data: { breadcrumb: 'Facilities'}},
    {path: 'amenities', loadChildren: '../content-management/amenities/amenities.module#AmenitiesModule', data: { breadcrumb: 'Content Management - Amenities'}},
    {path: 'venue-profile', loadChildren: '../content-management/venue-profile/venue-profile.module#VenueProfileModule'},
    {path: 'promotion', loadChildren: '../content-management/promotion/promotion.module#PromotionModule', data: { breadcrumb: 'Promotion'}},
    {path: 'decode', loadChildren: '../content-management/decode-master/decode-master.module#DecodeMasterModule', data: { breadcrumb: 'Decode'}},
    {path: 'hall-details', loadChildren: '../content-management/hall-details/hall-details.module#HallDetailsModule', data: { breadcrumb: 'Hall Details'}},
    {path: 'events', loadChildren: '../tariff/events/events.module#EventsModule', data: { breadcrumb: 'Events'}},
    {path: 'food-type', loadChildren: '../tariff/food-type/food-type.module#FoodTypeModule', data: { breadcrumb: 'Food Type'}},
    {path: 'duration', loadChildren: '../tariff/duration/duration.module#DurationModule', data: { breadcrumb: 'Duration'}},
    {path: 'cost-map', loadChildren: '../tariff/cost-mapping/cost-mapping.module#CostMappingModule', data: { breadcrumb: 'Tariff'}},
    {path: 'reservation', loadChildren: '../tariff/reservation/reservation.module#ReservationModule', data: { breadcrumb: 'Reservation'}},
    {path: 'pax-count', loadChildren: '../tariff/pax-count/pax-count.module#PaxCountModule', data: { breadcrumb: 'Buffet Count'}},
    {path: 'hourly-tariff', loadChildren: '../tariff/hourly-tariff/hourly-tariff.module#HourlyTariffModule', data: { breadcrumb: 'Hourly Traiff'}},
    {path: 'discount', loadChildren: '../tariff/discount/discount.module#DiscountModule', data: { breadcrumb: 'Discount'}},
    {path: 'buffet-master', loadChildren: '../buffet/buffet-master/buffet-master.module#BuffetMasterModule', data: { breadcrumb: 'Buffet Master'}},
    {path: 'buffet-category', loadChildren: '../buffet/buffet-category/buffet-category.module#BuffetCategoryModule', data: { breadcrumb: 'Buffet Category'}},
    {path: 'buffet-items', loadChildren: '../buffet/buffet-items/buffet-items.module#BuffetItemsModule', data: { breadcrumb: 'Buffet Items'}},
    {path: 'gallery', loadChildren: '../gallery-management/gallery-management.module#GalleryManagementModule', data: { breadcrumb: 'Gallery'}},
    {path: 'search', loadChildren: '../content-management/search/search.module#SearchModule', data: { breadcrumb: 'Content Management - Map Search'}},
    {path: 'my-report', loadChildren: '../my-report/my-report.module#MyReportModule', data: { breadcrumb: 'Report'}},
    {path: 'update-transaction', loadChildren: '../update-transaction/update-transaction.module#UpdateTransactionModule', data: { breadcrumb: 'Update Transaction'}}
   
    
  ]
}];
