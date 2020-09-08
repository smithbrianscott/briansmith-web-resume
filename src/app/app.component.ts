/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-app',
  template: `
  <router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit, OnDestroy {
  
  env: string;

  constructor(private themeService: NbThemeService) {
  }

  ngOnInit(): void {
    this.setTheme();
  }

  ngOnDestroy() {
  }

  setTheme() {
    // Check to see if the user has a theme in localStorge
    const themeKey = localStorage.getItem('ThemeKey');
    if (themeKey && this.themeService.currentTheme !== themeKey) {
      this.themeService.changeTheme(themeKey);
    }
  }
}
