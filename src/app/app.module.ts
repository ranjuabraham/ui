import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';

import { OverlayContainer, Overlay } from '@angular/cdk/overlay';
import { MAT_MENU_SCROLL_STRATEGY } from '@angular/material';
import { CustomOverlayContainer} from './super-admin/@theme/utils/custom-overlay-container';
import {menuScrollStrategy} from './super-admin/@theme/utils/scroll-strategy';



import {AppComponent} from './app.component';
import {LazyLoadModule} from './lazy-load/lazy-load.module';

import {CoreModule} from './super-admin/pages/core/core.module';
import {MatPaginatorModule} from '@angular/material';

import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';
// import { RecaptchaModule } from 'ng-recaptcha';
import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import {NotificationModule} from './super-admin/shared/notification';


import {AuthenticationService} from './_services';
import {AppService} from './app.service';
import {AppSettings} from './app.settings';
import {AppInterceptor} from './super-admin/@theme/utils/app-interceptor';
import {HttpErrorHandler} from './http-error-handler.service';
import {MessageService} from './message.service';
import {NotificationService} from './users/shared/notification';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    LazyLoadModule,
    CoreModule,
    MatPaginatorModule,
    SnotifyModule,
    NotificationModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    // RecaptchaModule
    // HomeModule
  ],
  providers: [
    AppService,
    AppSettings,
    HttpErrorHandler,
    MessageService,
    NotificationService,
    {provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService,
    AuthenticationService,
    { provide: OverlayContainer, useClass: CustomOverlayContainer },
    { provide: MAT_MENU_SCROLL_STRATEGY, useFactory: menuScrollStrategy, deps: [Overlay] },
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
    // {
    //   provide: RECAPTCHA_SETTINGS,
    //   useValue: { siteKey: '<6LcMYXIUAAAAAJhiVrJOkrbypA18_Xz98SIoAhVM>' } as RecaptchaSettings,
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
