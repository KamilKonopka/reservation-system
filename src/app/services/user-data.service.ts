import { Injectable } from '@angular/core';
import { AuthUser } from '../interfaces/authUser';
import { User } from '../model/user';

@Injectable()
export class UserDataService {

  profile: AuthUser;
  profileData: User;

  constructor() { }

  storeUserData() {

  }
}
