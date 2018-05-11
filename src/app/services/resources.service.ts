// import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Resource} from '../resources/resources.component';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Injectable} from '@angular/core';

const url = 'https://ecommunity-80ee.restdb.io/rest/czasoby';

const options = {
    headers: {
        'cache-control': 'no-cache',
        'x-apikey': '5ad4ec0a25a622ae4d52836f'
    }
};


@Injectable()
export class ResourcesService {

    private resourcesObs = new BehaviorSubject<Array<Resource>>([]);
    resources$ = this.resourcesObs.asObservable();

    constructor(private http: HttpClient) {
        this.getResources();
    }

    // Pobierz wszystkie zasoby
    getResources() {
        return this.http.get<Array<Resource>>(url + '?q={}&h={"$orderby": {"nazwa": 1}}', options).subscribe(
            res => {
                this.resourcesObs.next(res);
            },
            err => {
                console.log(err);
            }
        );
    }
}
