import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatPaginatorIntl } from '@angular/material';
import {RegistrationService} from '../services/registration.service';
import { Observable } from 'rxjs/Observable';
import {IUser} from '../interfaces/iuser';



@Component({
  selector: 'app-register-grid',
  templateUrl: './register-grid.component.html',
  styleUrls: ['./register-grid.component.less']
})
export class RegisterGridComponent implements OnInit {
 users: IUser[];
  displayedColumns = ['nickname', 'imie', 'name', 'email', 'telefon', 'akceptacja', 'archiwum'];
  dataSource = new MatTableDataSource(this.users);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private registrationService: RegistrationService) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.registrationService.getUsers()
      .subscribe(UserData => {
      if (!UserData) {
        return;
      }
      this.dataSource = new MatTableDataSource(UserData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      // = this.users;//new MatTableDataSource<IUser>(this.users);
      // console.log(JSON.stringify(this.dataSource.data));
     }, err => {console.log(JSON.stringify(err)); });

  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

