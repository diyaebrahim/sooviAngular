/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientXsrfModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
  NbThemeModule,
  NbInputModule,
} from '@nebular/theme';
import { AuthGuard } from './auth-guard.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from './@core/app-services/auth.service';
import { PagesModule } from './pages/pages.module';
import { MenuSharedService } from './@core/shared-services/menu-shared.service';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HttpErrorInterceptor } from './@core/app-services/error-interceptor.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CookieModule } from 'ngx-cookie';
import { UserServiceData } from './@core/app-services/user.service';
import { VersionCheckService } from './@core/version-check.service';
import { ProductService } from './@core/app-services/product.service';



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CookieModule.forRoot(),
    ThemeModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbThemeModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    CoreModule.forRoot(),
    NbDialogModule.forRoot(),
    PagesModule,
    NbInputModule,
    NbEvaIconsModule,
    NgbModule  ],
  providers: [
    AuthGuard,
    MenuSharedService,
    UserServiceData,
    VersionCheckService,
    AuthService,
    ProductService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    
    {
      provide: LocationStrategy, useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
