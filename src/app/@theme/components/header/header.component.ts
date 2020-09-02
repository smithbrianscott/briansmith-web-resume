import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { LayoutService } from '../../../@core/utils';
import { map, takeUntil, filter } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { RippleService } from '../../../@core/utils/ripple.service';
import { AdalService } from 'adal-angular4';
import { HttpHeaders } from '@angular/common/http';
import { AzureUserInfo } from '../../../@core/interfaces/azure-user-info';
import { TGHHttpService } from '../../../@core/data/tgh-http.service';
import { ImageService } from '../../../@core/data/image.service';
import { UserInfo } from '../../../@core/interfaces/user-info';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  public readonly materialTheme$: Observable<boolean>;
  userPictureOnly: boolean = false;
  user: UserInfo = new UserInfo();

  allowedToSeeGlobalSearch: boolean = true;
  allowedToSeeSettings: boolean = true;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
    {
      value: 'material-light',
      name: 'Material Light',
    },
    {
      value: 'material-dark',
      name: 'Material Dark',
    },
    {
      value: 'tgh-light',
      name: 'TGH Light'
    }
  ];

  currentTheme = 'default';

  userMenu = [ { title: 'Log out' } ];
  themeToggle: boolean;

  public constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private adalService: AdalService,
    private httpService: TGHHttpService,
    private imageService: ImageService,
    private layoutService: LayoutService,
    private router: Router,
    private breakpointService: NbMediaBreakpointsService,
    private rippleService: RippleService,
  ) {
    this.materialTheme$ = this.themeService.onThemeChange()
      .pipe(map(theme => {
        const themeName: string = theme?.name || '';
        return themeName.startsWith('material') || themeName.startsWith('tgh');
      }));
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.themeToggle = this.currentTheme == 'tgh-light' ? false : true;

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => {
        this.currentTheme = themeName;
        this.rippleService.toggle(themeName?.startsWith('material'));
      });

      this.menuService.onItemClick()
      .pipe(filter(({tag}) => tag === 'user-menu'),
      map((item) => item),)
      .subscribe(({item}) => {
        console.log(item);
        if (item.title === 'Log out') {
          this.logout();
        }
        else if (item.title == 'Profile') {
          this.router.navigateByUrl(item.data.path);
        }
      });

      this.getAzureUser();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
    localStorage.setItem('ThemeKey', themeName);
  }

  swapTheme() {    
    if (this.themeToggle) {
      this.changeTheme('tgh-light');
      //this.saveUserThemePreference('tgh-light');
    }
    else {
      this.changeTheme('tgh-dark');
      //this.saveUserThemePreference('tgh-dark');
    }
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  getAzureUser() {
    this.adalService.acquireToken('https://graph.microsoft.com')
      .subscribe(token => {
        let header = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        this.httpService.getWithHeader('https://graph.microsoft.com/v1.0/me', header)
          .subscribe((res: AzureUserInfo) => {
            console.log(res);
            this.user.fullName = res.givenName + ' ' + res.surname;
            this.user.title = res.jobTitle;
            this.user.email = res.mail;
            this.imageService.getPhotoForUserInfo(this.user);
          });
      })
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.adalService.logOut();
  }

  toggleSettings() {
    this.router.navigateByUrl('/pages/admin/settings');
  }
}
