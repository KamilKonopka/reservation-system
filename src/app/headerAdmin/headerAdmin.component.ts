import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthUser } from '../interfaces/authUser';
import { User } from '../model/user';

@Component ({
  selector: 'app-header-admin',
  templateUrl: './headerAdmin.component.html',
  styleUrls: ['./headerAdmin.component.less']
})
export class HeaderAdminComponent implements OnInit {

  admin: boolean;
  profile: AuthUser;
  profileData: User;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  this.isAdmin();
  }

  logout() {
    this.authService.logout();
  }

  isAdmin () {
    if (this.authService.userProfile) {
      this.profile = this.authService.userProfile;
     } else {
       this.authService.getProfile((err, profile) => {
         this.profile = profile;
         this.authService.getUserByEmail(this.profile.name).subscribe(userData => {
         this.profileData = userData;
         localStorage.setItem('profile', JSON.stringify(this.profileData[0]));
         this.admin = this.profileData[0].moderator;
         });
       });
     }
  }

}
