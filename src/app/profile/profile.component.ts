import { Component, OnInit, Input } from '@angular/core';
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

  profileData: User = JSON.parse(localStorage.getItem('profile'));
  profile: AuthUser = JSON.parse(localStorage.getItem('authProfile'));



  constructor(public authService: AuthService) { }

  ngOnInit() {

  }

}


