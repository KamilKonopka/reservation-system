import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { Router } from '@angular/router';



@Injectable()
export class AuthService {
  AuthService = new auth0.WebAuth ({
    clientID: 'A6UO6a31f5i1caz7J6wHdoY6LQqTKXcO',
    domain: 'trutnie.eu.auth0.com',
    responseType: 'token id_token',
    audience: 'https://trutnie.eu.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/logged',
    scope: 'openid'
  });
  constructor(public router: Router) { }

  public login(): void {
    this.AuthService.authorize();
  }
}
