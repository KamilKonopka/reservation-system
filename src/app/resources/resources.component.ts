import {Component, OnInit, ViewChild} from '@angular/core';
import {ResourcesService} from '../services/resources.service';
import {ITools} from '../interfaces/itools';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import {RegistrationService} from '../services/registration.service';
import {IUser} from '../interfaces/iuser';
import {AuthUser} from '../interfaces/authUser';
import {AuthService} from '../services/auth.service';


@Component({
    selector: 'app-resources',
    templateUrl: './resources.component.html',
    styleUrls: ['./resources.component.less']
})
export class ResourcesComponent implements OnInit {

  profileData: IUser = JSON.parse(localStorage.getItem('profile'));
  profile: AuthUser = JSON.parse(localStorage.getItem('authProfile'));

    resources: ITools[];
    columnsToDisplay = ['nazwa', 'opis', 'data_prod', 'producent', 'wlasciciel', 'uwagi', 'archiwum'];
    dataSource = new MatTableDataSource();
    loaded;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    user: IUser[];

  constructor(
    private resService: ResourcesService,
    public authService: AuthService,
    private registrationService: RegistrationService) {}

    // getResources() {
    //     this.allResources$ = this.resService.resources$;
    // }

      applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }

  ngOnInit() {

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.resService.getResources().subscribe(resourceData => {
                if (!resourceData) {
                    return;
                }
                this.dataSource = new MatTableDataSource(resourceData);
                // w przypadku obiektów zagnieżdżonych, do zakresu filtrowania należy dodać pola obiektu zagnieżdżonego
                this.dataSource.filterPredicate = (data: any, filter: string) => {
                    const accumulator = (currentTerm, key) => {
                        return key === 'wlasciciel' ? currentTerm + data.wlasciciel[0].name +
                            data.wlasciciel[0].imie : currentTerm + data[key];
                    };
                    const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
                    // Transform the filter by converting it to lowercase and removing whitespace.
                    const transformedFilter = filter.trim().toLowerCase();
                    return dataStr.indexOf(transformedFilter) !== -1;
                };
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                // w przypadku obiektów zagnieżdżonych, aby sortowanie działało,
                // należy zdefiniować dostęp do odpowiedniego pola zagnieżdżonego obiektu
                this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
                    if (sortHeaderId === 'wlasciciel') {
                        // console.log(sortHeaderId);
                        // console.log(data[sortHeaderId][0].name);
                        return data[sortHeaderId][0].name;
                    }
                    return data[sortHeaderId];
                };
            }, err => {
                console.log(JSON.stringify(err));
            }, () => {
                this.loaded = true;
            }
        );
        this.registrationService.getUsers()
            .subscribe(UserData => {
                if (!UserData) {
                    return;
                }
                this.user = UserData;
                // console.log('Id usera: ' + this.user[0]._id);
            }, err => {
                console.log(JSON.stringify(err));
            });
    }
}

