import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, NbDialogService } from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { RippleService } from '../../../@core/utils/ripple.service';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuSharedService } from '../../../@core/shared-services/menu-shared.service';
import { UserServiceData } from '../../../@core/app-services/user.service';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  functionSearch: boolean;
  private destroy$: Subject<void> = new Subject<void>();
  public readonly materialTheme$: Observable<boolean>;
  userPictureOnly: boolean = false;
  user: {};

  themes = [
    // {
    //   value: 'default',
    //   name: 'Light',
    // },
    {
      value: 'dark',
      name: 'Dark Mode',
    },
    {
      value: 'cosmic',
      name: 'Blue',
    },
    {
      value: 'corporate',
      name: 'White',
    },
    // {
    //   value: 'material-light',
    //   name: 'Material Light',
    // },
    {
      value: 'material-dark',
      name: 'Pink & Dark',
    },
  ];

  currentTheme = 'default';

  userMenu = [{ title: 'Change Password', link: '/auth/change-password' },{ title: 'Log out', link: '/auth/logout' }];
  loggedUserName: string = '';
  public constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private rippleService: RippleService,
    private authService: NbAuthService,
    private dialogService: NbDialogService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private menuSharedService: MenuSharedService,
    private userService: UserServiceData,
    private cookieService: CookieService
  ) {
    // this.systemAccess = JSON.parse(cookieService.get('SystemAccess'));
    // this.functionSearch = this.systemAccess.some(s => s.pageId === 1 && s.controlsId.includes(10));
    userService.getUserName().subscribe(data => {
      this.loggedUserName = data.userName;
    })
    this.materialTheme$ = this.themeService.onThemeChange()
      .pipe(map(theme => {
        const themeName: string = theme?.name || '';
        return themeName.startsWith('material');
      }));

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.user = token.getPayload();
        }

      });
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    // this.userService.getUsers()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((users: any) => this.user = users.nick);

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
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }
  openThemeDialog(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }
  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
