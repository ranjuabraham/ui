import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth.component';
import {AuthGuard} from '../../../_guards';

export const appRoutes: Routes = [{
  path: '', component: AuthComponent, children: [
    {path: '', loadChildren: '../home/home.module#HomeModule'},
    {path: 'profile', loadChildren: '../profile/profile.module#ProfileModule', canActivate: [AuthGuard]},
    {path: 'booking', loadChildren: '../booking/booking.module#BookingModule', canActivate: [AuthGuard]},
    {path: 'change-password', loadChildren: '../change-password/change-password.module#ChangePasswordModule', canActivate: [AuthGuard]},
    {path: 'my-wishlist', loadChildren: '../my-wishlist/my-wishlist.module#MyWishlistModule', canActivate: [AuthGuard]},
    {path: 'my-reviews', loadChildren: '../my-reviews/my-reviews.module#MyReviewsModule', canActivate: [AuthGuard]},
    {path: 'about-us', loadChildren: '../about-us/about-us.module#AboutUsModule'},
    {path: 'contact-us', loadChildren: '../contact-us/contact-us.module#ContactUsModule'},
    {path: 'disclaimer', loadChildren: '../disclaimer/disclaimer.module#DisclaimerModule'},
    {path: 'terms', loadChildren: '../terms/terms.module#TermsModule'},
    {path: 'privacy', loadChildren: '../privacy/privacy.module#PrivacyModule'},
    {path: 'security', loadChildren: '../security/security.module#SecurityModule'},
    {path: 'cookies', loadChildren: '../cookies/cookies.module#CookiesModule'},
    {path: 'faq', loadChildren: '../faq/faq.module#FaqModule'},
    {path: 'how-it-works', loadChildren: '../how-it-works/how-it-works.module#HowItWorksModule'},
    {path: 'feedback', loadChildren: '../feedback/feedback.module#FeedbackModule'},
    // {path: '', loadChildren: '../banner/banner.module#BannerModule'},
    // {path: '', loadChildren: '../quick-contact/quick-contact.module#QuickContactModule'},
    {path: 'register-venue', loadChildren: '../register-venue/register-venue.module#RegisterVenueModule'},
    {path: 'chennai', loadChildren: '../halls-list/halls-list.module#HallsListModule', data: { breadcrumb: 'Chennai' }},
    {path: 'checkout', loadChildren: '../checkout/checkout.module#CheckoutModule', data: { breadcrumb: 'Checkout' }},
    // {path: 'venue-admin', loadChildren: '../../../admin/pages/booking-management/quick-block/quick-block.module#QuickBlockModule'},
  ]
}];
