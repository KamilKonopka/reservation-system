import { Injectable } from '@angular/core';
import {ITools} from '../interfaces/itools';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { IRental } from '../interfaces/irental';
import { Rent } from '../interfaces/myRentals';


const url = 'https://ecommunity-80ee.restdb.io/rest';
const options = {
  headers: {
    'cache-control': 'no-cache',
    'x-apikey': '5ad4ec0a25a622ae4d52836f',
    'content-type': 'application/json'
  }
};

@Injectable()
export class UserDashboardDataService {

  private dashboardObs = new BehaviorSubject<Array<ITools>>([]);
  resources$ = this.dashboardObs.asObservable();

  constructor(private http: HttpClient) {
    this.getResourcesDate();
    this.getResourcesCount();
  }

  // Nowe zasoby dodane w ciągu 30 dni
  getResourcesDate() {
    return this.http.get<Array<ITools>>(url + '/czasoby?q={"_created":{"$gt":{"$date":"$moment.subtract.30.days"}}}&h={"$orderby": ' +
      '{"_created": -1}}', options).subscribe(
      res => {
        this.dashboardObs.next(res);
      },
      err => {
        console.log(err);
      }
    );
  }
  // Pobierz liczbę zasobów
  getResourcesCount(): Promise<number> {
    return new Promise<number>((records) => {
      this.http.get(url + '/czasoby?totals=true&count=true', options).subscribe(amount => {
        records(amount['totals'].count);
      });
    });
  }
  getMyReservations(id: string): Observable<Array<Rent>> {
    return this.http.get<Array<Rent>>(url + '/cwypozyczenia?q={"uzytkownik":{"_id":"' + id + '"}}', options);
  }
}
