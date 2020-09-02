/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbWindowModule,
} from '@nebular/theme';
import { TGHHttpService } from './@core/data/tgh-http.service';
import { AdalGuard, AdalService, AdalInterceptor } from 'adal-angular4';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { LicenseManager } from 'ag-grid-enterprise';
import { ToastrModule } from 'ngx-toastr';

LicenseManager.setLicenseKey("Florida_health_Sciences__Help_Desk_1Devs18_December_2019__MTU3NjYyNzIwMDAwMA==4de7c587040ca1de51281290d761ac58");

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      maxOpened: 5,
    }),
  ],
  bootstrap: [AppComponent],
  providers: [TGHHttpService, AdalGuard, AdalService,
    { provide: HTTP_INTERCEPTORS, useClass: AdalInterceptor, multi: true },
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },]
})
export class AppModule {
}
