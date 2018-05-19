import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { IUser } from '../interfaces/iuser';
import { User } from '../model/user';
import { AuthUser } from '../interfaces/authUser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
  profile: AuthUser;
  profileData: User;


  constructor(public authService: AuthService) { }

  ngOnInit() {

    if (this.authService.userProfile) {
     this.profile = this.authService.userProfile;
    } else {
      this.authService.getProfile((err, profile) => {
        this.profile = profile;
        this.authService.getUserByEmail(this.profile.name).subscribe(userData => {
        this.profileData = userData;
        console.log(this.profileData);
        });
      });
    }

  }

}


