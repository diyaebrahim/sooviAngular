import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: NbAuthService, private router: Router) {
    }
    canActivate() {
        return this.authService.isAuthenticated()
          .pipe(
            tap(authenticated => {
              if (!authenticated) {
                document.location.href = environment.loginUrl;
              }
            }),
          );
      }
}