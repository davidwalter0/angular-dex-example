import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
})
export class AuthorizedComponent implements OnInit {

  constructor(private oauthService: OAuthService) {
  }

  get givenName() {
    const claims: any = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims.name;
  }

  ngOnInit() {
  }

}
