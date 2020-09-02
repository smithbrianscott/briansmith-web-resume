/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { AdalService } from 'adal-angular4';
import { adalOptions } from './@core/config/adal-config';
import { TGHHttpService } from './@core/data/tgh-http.service';
import { Router } from '@angular/router';
import { NbMenuService, NbThemeService } from '@nebular/theme';
import { Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import { IdleConfig } from './@core/config/idle-config';
import { IdleModalComponent } from './@core/modals/idle-modal/idle-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-app',
  template: `
  <router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit, OnDestroy {

  idleModalRef: any;

  env: string;

  constructor(private analytics: AnalyticsService, 
              private adalService: AdalService,
              private router: Router,
              private idle: Idle,
              private themeService: NbThemeService,
              private menuService: NbMenuService,
              private httpService: TGHHttpService,
              private modalService: NgbModal,
              private seoService: SeoService) {
      adalService.init(adalOptions);
  }

  ngOnInit(): void {
    this.setTheme();
    this.env = this.httpService.getCurrentEnvironment();
    const hashUrl = window.location.hash;

    this.adalService.handleWindowCallback(false);

    if (hashUrl.includes('id_token')) {
      this.handleAuthCallback();
    }

    if (!this.adalService.userInfo.authenticated) {
      this.adalService.login();
    } else {
      if (parent === top && !(hashUrl.includes('access_token'))) {
        console.log('loading start-up items');
        this.loadAppStartUpItems();
      }
    }
  }

  ngOnDestroy() {
    this.idle.ngOnDestroy();
  }

  setTheme() {
    // Check to see if the user has a theme in localStorge
    const themeKey = localStorage.getItem('ThemeKey');
    if (themeKey && this.themeService.currentTheme !== themeKey) {
      this.themeService.changeTheme(themeKey);
    }
  }

  loadAppStartUpItems() {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();

    // start idle watch
    if (this.env !== 'LOCALDEV') {
      //console.log('start idle');
      this.watchForIdle();
    }

    // Inject WalkMe
    //this.startWalkMe();
  }

  handleAuthCallback() {
    const url = localStorage.getItem('adal.login.request');

      if (url) {
        // Split request url by char /
        const urlArray = url.split('/');
        // Identify host
        const host = urlArray[0] + '//' + urlArray[2] + '/';
        // Build path to request url
        let newUrl = url.replace(host, '');
        // Remove hash from URL (Only needed if using hash strategy)
        newUrl = newUrl.replace('#', '');

        // Go to desired page.
        this.router.navigateByUrl(newUrl);
      }
      else {
        this.menuService.navigateHome();
      }
  }

  watchForIdle() {
    console.log(IdleConfig.idle, IdleConfig.timeout);
    this.idle.setIdle(IdleConfig.idle); // 30 mins (1800 seconds)
    this.idle.setTimeout(IdleConfig.timeout); // show time out modal for 30 mins (1800 seconds)
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleEnd.subscribe(() => {
      this.idleModalRef.close();
    });
    this.idle.onTimeout.subscribe(() => {
      this.adalService.logOut();
    });
    this.idle.onIdleStart.subscribe(() => {
      this.idleModalRef = this.modalService.open(IdleModalComponent, { size: 'lg', container: 'nb-layout' });
    })
    this.idle.onTimeoutWarning.subscribe((countdown) => {
      // pass the current remaining number to the modal
      this.idleModalRef.componentInstance.countdown = countdown;
    })

    this.idle.watch();
  }
}
