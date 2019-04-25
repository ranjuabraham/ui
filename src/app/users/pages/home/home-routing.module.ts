import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home.component';
import {ProfileComponent} from '../profile/profile.component';
import {AuthGuard} from '../../../_guards';



export const appRoutes: Routes = [{
  path: '', component: HomeComponent, children: [
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
    {path: '', loadChildren: '../banner/banner.module#BannerModule'},
    // {path: '', loadChildren: '../quick-contact/quick-contact.module#QuickContactModule'},
    {path: 'register-venue', loadChildren: '../register-venue/register-venue.module#RegisterVenueModule'},
  ]
}];

