import { Component } from '@angular/core';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
import { config } from './config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private username: string;
  private password: string;
  private error: string;
  private title = 'Angular Dex Authentication App';
  private collection = [];

  constructor(private oauthService: OAuthService, private router: Router) {
    this.oauthService.issuer = config.issuer;
    this.oauthService.clientId = config.clientid;
    this.oauthService.redirectUri = window.location.origin + '/home';
    this.oauthService.scope = 'openid profile email';
    this.oauthService.oidc = true;
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.showDebugInformation = true;
    this.oauthService.sessionChecksEnabled = true;
    this.oauthService.loadDiscoveryDocumentAndTryLogin();

    console.log('redirectUri', this.oauthService.redirectUri, 'window', window.location.origin + '/home');
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
  }

  login() {
    this.oauthService.initImplicitFlow();
  }

  logout() {
    this.oauthService.logOut();
    this.router.navigate(['/home']);
  }

  get givenName() {
    const claims: any = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims.name;
  }
}
