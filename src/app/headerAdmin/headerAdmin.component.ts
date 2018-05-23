import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthUser } from '../interfaces/authUser';
import { User } from '../model/user';

@Component({
  selector: 'app-header-admin',
  templateUrl: './headerAdmin.component.html',
  styleUrls: ['./headerAdmin.component.less']
})
export class HeaderAdminComponent implements DoCheck {
  admin = false;
  profile: AuthUser;
  profileData = User;

  constructor(public authService: AuthService) {}

  ngDoCheck() {
    this.profileData = JSON.parse(localStorage.getItem('profile'));

    if (localStorage.getItem('profile')) {
      this.isAdmin();
    } else {
      return false;
    }

  }

  logout() {
    this.authService.logout();
  }

  isAdmin() {
    if (this.profileData[0].moderator === true) {
      this.admin = true;
    } else {
      this.admin = false;
    }
  }
}
