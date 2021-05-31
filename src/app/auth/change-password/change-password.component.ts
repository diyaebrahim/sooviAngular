import { Component, OnInit } from "@angular/core";
import { TokenLocal } from "../../@core/models/token-local";

@Component({
  selector: "ngx-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
})
export class ChangePasswordComponent implements OnInit {
  local: TokenLocal = new TokenLocal();
  constructor() {
    this.local = JSON.parse(localStorage.getItem("auth_app_token"));
    document.location.href = "http://login.goods-mart.com/#/auth/change-password?tk=" + this.local.value;
  }

  ngOnInit(): void {}
}
