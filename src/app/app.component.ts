/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { NbIconLibraries } from '@nebular/theme';
import { VersionCheckService } from './@core/version-check.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private versionCheckService: VersionCheckService, private analytics: AnalyticsService, private iconLibraries: NbIconLibraries) {
    this.iconLibraries.registerFontPack('font-awesome', { iconClassPrefix: 'fa' });
  }

  ngOnInit() {
    this.analytics.trackPageViews();
    this.versionCheckService.initVersionCheck(environment.checkUrl);
  }
}
