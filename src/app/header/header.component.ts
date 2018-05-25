import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {HeaderAdminComponent} from '../headerAdmin/headerAdmin.component';

@Component ({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

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
