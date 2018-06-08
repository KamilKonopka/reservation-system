import { Component, OnInit, ViewChild } from '@angular/core';
import { ResourcesService } from '../services/resources.service';
import { UserDashboardDataService } from '../services/user-dashboard-data.service';
import { Rent } from '../interfaces/myRentals';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { Location } from '@angular/common';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.less']
})
export class MyReservationsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  profileData = JSON.parse(localStorage.getItem('profile'));
  id = this.profileData[0]._id;
  columnsToDisplay = ['zasob', 'uzytkownik'];
  dataSource = new MatTableDataSource();
  myRentals: Rent[];
  loaded = false;

  constructor(public resService: UserDashboardDataService, private location: Location) { }

  ngOnInit() {
    console.log(this.id);
    this.getAllMyReservations(this.id);
  }

  getAllMyReservations(id) {
    this.resService.getMyReservations(id).subscribe(data => {
      this.myRentals = data;
    }, () => {
      this.loaded = true;
    });
  }
  goBack() {
    this.location.back();
  }
}
