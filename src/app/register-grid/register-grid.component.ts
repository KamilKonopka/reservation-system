import { Component, OnInit } from '@angular/core';
import {RegistrationService} from '../services/registration.service';
import {IUser} from '../interfaces/iuser';


@Component({
  selector: 'app-register-grid',
  templateUrl: './register-grid.component.html',
  styleUrls: ['./register-grid.component.less']
})
export class RegisterGridComponent implements OnInit {
users: IUser[];

  constructor(private registrationService: RegistrationService) { }

  ngOnInit() {

    this.registrationService.getUsers().subscribe(UserData => {
      //console.log(JSON.stringify(UserData));
      this.users = UserData;
     }, err => {console.log(JSON.stringify(err)); });

  }

}
