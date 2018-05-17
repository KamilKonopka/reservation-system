import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component ({
  selector: 'app-header-admin',
  templateUrl: './headerAdmin.component.html',
  styleUrls: ['./headerAdmin.component.less']
})
export class HeaderAdminComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }
  login() {
    this.authService.login();
  }
  logout() {
    this.authService.logout();
  }
}