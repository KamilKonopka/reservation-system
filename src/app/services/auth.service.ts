import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RegistrationService } from './registration.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../model/user';

const url = 'https://ecommunity-80ee.restdb.io/rest/cuzytkownicy';
const getoptions = {
  headers: {
    'cache-control': 'no-cache',
    'x-apikey': '5ad4ec0a25a622ae4d52836f'
  }
};

const options = {
  headers:
    {   'cache-control': 'no-cache',
      'x-apikey': '5ad4ec0a25a622ae4d52836f',
      'content-type': 'application/json'
    }
};

@Injectable()
export class AuthService {

  userProfile: any;
  AuthService = new auth0.WebAuth ({
    clientID: 'A6UO6a31f5i1caz7J6wHdoY6LQqTKXcO',
    domain: 'trutnie.eu.auth0.com',
    audience: 'https://trutnie.eu.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/logged',
    read: 'users',
    responseType: 'token id_token',
    scope: 'openid profile',

  });

  constructor(
    public router: Router,
    public http: HttpClient
  ) { }

  public login(): void {
    this.AuthService.authorize();
  }
  public handleAuthentication(): void {
    this.AuthService.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/logged']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);

  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

    // Go back to the home route
    this.router.navigate(['/home']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    this.AuthService.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  }
  public getUserByEmail( email: string): Observable<User> {
    return this.http.get<User>(url + '?q={%22email%22:%22' + email + '%22}', getoptions);
  }
}
