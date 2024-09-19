import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms' // Chat-GPT

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxInfiniteScrollComponent } from './components/ngx-infinite-scroll/ngx-infinite-scroll.component';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { environment } from "../environments/environment";
import { GoogleSsoDirective } from './google-ss.directive';
import { SecretsService } from './services/secrets.service';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { bearerTokenInterceptor } from './bearer-token.interceptor';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PropertyCardComponent } from './components/property-card/property-card.component';
import { LandingComponent } from './components/landing/landing.component';
import { lastValueFrom } from 'rxjs';
import { PropertyCardCoverComponent } from './components/property-card-cover/property-card-cover.component';

// The following site shows authentication
// https://medium.com/@gabriel.cournelle/firebase-authentication-in-angular-ab1b66d041dc

// Chat-GPT showed how to read in secrets from the Express server in order
// to initialize our Firebase app and how to delete a key.

export function loadEnvironmentSecrets(secretsService: SecretsService) {

  return async () => {
    
    let envVars = await lastValueFrom(secretsService.getSecrets());
    delete envVars.zillowkey; // Don't need zillowkey for Firebase config.

    Object.assign(environment.firebaseConfig, envVars);
  };

}

@NgModule({
  declarations: [
    AppComponent,
    NgxInfiniteScrollComponent,
    GoogleSsoDirective,
    NavBarComponent,
    PropertyCardComponent,
    LandingComponent,
    PropertyCardCoverComponent,
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    AppRoutingModule,
    InfiniteScrollDirective,
    FormsModule,     // Chat-GPT
  ],
  providers: [
    {
    provide: APP_INITIALIZER,
    useFactory: loadEnvironmentSecrets,
    deps: [SecretsService],
    multi: true
  },
  provideHttpClient(withInterceptors([bearerTokenInterceptor]))],
  bootstrap: [AppComponent]
})
export class AppModule {}
