import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NbTokenLocalStorage } from "@nebular/auth";
import { CookieService } from "ngx-cookie";
import { AuthService } from "../../@core/app-services/auth.service";
import { TokenLocal } from "../../@core/models/token-local";
import { MenuSharedService } from "../../@core/shared-services/menu-shared.service";

@Component({
  selector: "ngx-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"],
})
export class WelcomeComponent {
  tokenLocal: TokenLocal;

  constructor(
    route: ActivatedRoute, private router: Router, private AuthService: AuthService, private cookieService: CookieService,
    
  ) {
    cookieService.removeAll();
    route.queryParams.subscribe((params) => {
      // Defaults to 0 if no query param provided.
      var token = params["tk"] || 0;
      if (token != 0) {
        this.tokenLocal = new TokenLocal();
        this.tokenLocal.createdAt = new Date().getTime();
        this.tokenLocal.name = "nb:auth:jwt:token";
        this.tokenLocal.ownerStrategyName = "email";
        this.tokenLocal.value = token;
        localStorage.setItem('auth_app_token', JSON.stringify(this.tokenLocal));
        // AuthService.getSystemAccess(3).subscribe(data => {
        //   this.systemAccess = data;
        //   cookieService.putObject('SystemAccess', data);
        //   console.log(JSON.parse(cookieService.get('SystemAccess')));
        //   setTimeout(() => this.router.navigate(["/pages/dashboard"]), 300);
        // });
      }
    });
  }
}
