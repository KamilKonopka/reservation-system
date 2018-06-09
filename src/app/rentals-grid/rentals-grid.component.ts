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
        this.dataSource.filterPredicate = (data: any, filter: string) => {
          const accumulator = (currentTerm, key) => {
            //console.log(currentTerm);
            if (key === 'zasob' && data.zasob.length > 0) {
             return currentTerm + data.zasob[0].nazwa;
            }
            if (key === 'uzytkownik' && data.uzytkownik.length > 0) {
              return currentTerm + data.uzytkownik[0].imie + data.uzytkownik[0].name + data.uzytkownik[0].nickname;
            }
            return  currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          // Transform the filter by converting it to lowercase and removing whitespace.
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
          if (sortHeaderId === 'name') {
            // console.log(sortHeaderId);
            return data['uzytkownik'].length > 0 ? data['uzytkownik'][0].name : '';
          }
          if (sortHeaderId === 'imie') {
            // console.log(sortHeaderId);
            return data['uzytkownik'].length > 0 ? data['uzytkownik'][0].imie : '';
          }
          if (sortHeaderId === 'nickname') {
            // console.log(sortHeaderId);
            return data['uzytkownik'].length > 0 ? data['uzytkownik'][0].nickname : '';
          }
          if (sortHeaderId === 'nazwa') {
            // console.log(sortHeaderId);
            console.log(JSON.stringify(data['zasob']));
            return data['zasob'].length > 0 ? data['zasob'][0].nazwa : '';
          }
          return data[sortHeaderId];
        };
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
