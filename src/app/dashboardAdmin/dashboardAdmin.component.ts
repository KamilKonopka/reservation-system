import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthGuardsService } from '../services/auth-guard.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../model/user';
import { IUser } from '../interfaces/iuser';
import { AuthUser } from '../interfaces/authUser';
import { DashboardService } from '../services/admin-dashboard-data';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboardAdmin.component.html',
  styleUrls: ['./dashboardAdmin.component.less']
})

export class DashboardAdminComponent implements OnInit {

  profileData: IUser = JSON.parse(localStorage.getItem('profile'));
  profile: AuthUser = JSON.parse(localStorage.getItem('authProfile'));
  allAcceptedUsers = null;
  nonAcceptedUsersCount = null;


  constructor(
    public authService: AuthService,
    private authGuardService: AuthGuardsService,
    private dashboardService: DashboardService,
    private route: ActivatedRoute
  ) { }

  refreshData() {
    this.dashboardService.getNonAcceptedUsers().then(x => {
      this.nonAcceptedUsersCount = x;
    });
    this.dashboardService.getAllAcceptedUsers().then(y => {
      this.allAcceptedUsers = y;
    });

  }
  ngOnInit() {
    this.refreshData();
  }
}
