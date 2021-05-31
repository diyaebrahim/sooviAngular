import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbAuthComponent } from '@nebular/auth';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NgxLoginComponent } from './login/login.component';
import { NgxLogoutComponent } from './logout/logout.component';
import { WelcomeComponent } from './welcome/welcome.component';

export const routes: Routes = [
  { path: '',
    component: NbAuthComponent,
    children: [
      {
        path: 'login',
        component: NgxLoginComponent, 
      },
      {
        path: 'logout',
        component: NgxLogoutComponent, 
      },
      {
        path: 'welcome',
        component: WelcomeComponent, 
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent, 
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}