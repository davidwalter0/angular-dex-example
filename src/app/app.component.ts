import { Component } from '@angular/core';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private username: string;
  private password: string;
  private error: string;

  title = 'Angular Dex Authentication App';

  constructor(private oauthService: OAuthService) { // , private changeDetector: ChangeDetectorRef) {
    this.oauthService.redirectUri = window.location.origin + '/home';
    console.log('redirectUri', this.oauthService.redirectUri, 'window', window.location.origin + '/home');
    this.oauthService.clientId = 'angular-example';
    this.oauthService.scope = 'openid profile email';
    this.oauthService.oidc = true;
    this.oauthService.issuer = 'https://example.com:5556';
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.showDebugInformation = true;
    this.oauthService.sessionChecksEnabled = true;
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login() {
    this.oauthService.initImplicitFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  get givenName() {
    const claims: any = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims.name;
  }
}
