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

  @Input() profileData: User;
  @Input() profile: AuthUser;

  constructor(public authService: AuthService) { }

  ngOnInit() {

  }

}


