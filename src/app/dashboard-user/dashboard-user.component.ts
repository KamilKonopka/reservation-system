import { Component, OnInit } from '@angular/core';
import {ITools} from '../interfaces/itools';
import {Observable} from 'rxjs/Observable';
import {UserDashboardDataService} from '../services/user-dashboard-data.service';
import {IUser} from '../interfaces/iuser';
import {AuthUser} from '../interfaces/authUser';
import {AuthGuardsService} from '../services/auth-guard.service';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../services/auth.service';
import { IRental } from '../interfaces/irental';
import { Rent } from '../interfaces/myRentals';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.less']
})


export class DashboardUserComponent implements OnInit {
  profileData: IUser = JSON.parse(localStorage.getItem('profile'));
  profile: AuthUser;
  allResources$: Observable<Array<ITools>>;
  loaded = false;
  ResourcesCount = null;
  myRentalArray: Rent[];

constructor(
    private resService: UserDashboardDataService,
    public authService: AuthService
  ) { }
    getResourcesDate() {
    this.allResources$ = this.resService.resources$;
  }
  getResourcesCount() {
    this.resService.getResourcesCount().then(amount => {
      this.ResourcesCount = amount;
    });
  }
  getMyReservations() {
  this.resService.getMyReservations(this.profileData._id).subscribe(
    rentalData => {
      console.log(rentalData);
    }
  );
  }

  ngOnInit() {

    console.log(this.profileData._id);
    this.getResourcesDate();
    this.getResourcesCount();
    this.getMyReservations();
    if (this.ResourcesCount && this.allResources$ && this.myRentalArray) {
      this.loaded = true;
    } else {
      this.loaded = false;
    }
}
}
