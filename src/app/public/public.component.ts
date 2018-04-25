import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  templateUrl: './public.component.html',
})
export class PublicComponent {
  private username: string;
  private password: string;
  private error: string;

  constructor(private oauthService: OAuthService) {
  }


  get givenName() {
    const claims: any = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims.name;
  }
}
