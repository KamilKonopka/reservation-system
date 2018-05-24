import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Resource } from '../resources/resources.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { IUser } from '../interfaces/iuser';
import { User } from '../model/user';

const url = 'https://ecommunity-80ee.restdb.io/rest/cuzytkownicy';
const url1 = 'https://ecommunity-80ee.restdb.io/rest/czasoby';
const options = {
    headers:
        {
            'cache-control': 'no-cache',
            'x-apikey': '5ad4ec0a25a622ae4d52836f',
            'content-type': 'application/json'
        }
};


@Injectable()
export class DashboardService {

    private dashboardObs = new BehaviorSubject<Array<User>>([]);
    users$ = this.dashboardObs.asObservable();

    constructor(private http: HttpClient) { }

    // Pobierz tylko liczbę tych ludków
    getNonAcceptedUsers(): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this.http.get(url + '?q={"akceptacja":false}&totals=true&count=true', options).subscribe(x => {
                
                resolve(x["totals"].count);
            });
        });        
    }

    // Pobierz liczbę wszystkich aktywnych
    getAllAcceptedUsers(): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this.http.get(url + '?q={"akceptacja":true}&totals=true&count=true', options).subscribe(y => {
                
                resolve(y["totals"].count);
            });
        });
        
    }
     
}
