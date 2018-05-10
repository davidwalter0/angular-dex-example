import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { OAuthModule } from 'angular-oauth2-oidc';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AdminAuthGuard } from './admin.auth.guard';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PublicComponent } from './public/public.component';
import { AuthorizedComponent } from './authorized/authorized.component';
import { DebugComponent } from './debug/debug.component';
import { MaterialModule } from './material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { PagerComponent } from './pager/pager.component';
import { StringFilterPipe } from './pager/string-filter.pipe';

// import { Highlighter } from './providers/highlighter.service';
import { MealsService } from './providers/meals.service';

const appRoutes: Routes = [
  { path: 'authorized', component: AuthorizedComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'pager', component: PagerComponent },
  { path: 'public', component: PublicComponent },
  { path: 'debug', component: DebugComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DebugComponent,
    PublicComponent,
    AuthorizedComponent,
    PagerComponent,
    StringFilterPipe,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MaterialModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    OAuthModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    NgxPaginationModule,
  ],
  providers: [
    AuthGuard,
    AdminAuthGuard,
    // Highlighter,
    MealsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
