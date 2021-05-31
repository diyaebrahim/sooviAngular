import { Component } from '@angular/core';
import { MenuSharedService } from '../@core/shared-services/menu-shared.service';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="this.menuSharedService.DASHBOARD_MENU"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  constructor(public menuSharedService: MenuSharedService){
  }
}
