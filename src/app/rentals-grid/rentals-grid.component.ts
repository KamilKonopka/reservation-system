import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {ResourcesService} from '../services/resources.service';
import {RentalService} from '../services/rental.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Rental} from '../model/rental';

@Component({
  selector: 'app-rentals-grid',
  templateUrl: './rentals-grid.component.html',
  styleUrls: ['./rentals-grid.component.less']
})
export class RentalsGridComponent implements OnInit {
  users: Rental[];
  displayedColumns = ['data_wypozyczenia', 'data_zwrotu', 'nazwa', 'imie', 'name', 'nickname'];
  dataSource = new MatTableDataSource(this.users);
  loaded;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private rentalService: RentalService, private authService: AuthService, private resourcesService: ResourcesService, private route: ActivatedRoute,  private router: Router  ) { }


  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.rentalService.getRentals().subscribe(
      res => {
       //   this.router.navigate(['logged/resources']);
        if (!res) {
          return;
        }
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        JSON.stringify(this.dataSource.filteredData);
        }
    ,
        err => {console.log(JSON.stringify(err)); }, () => {this.loaded = true; });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
