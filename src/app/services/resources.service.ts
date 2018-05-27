import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Tools} from '../model/tools';
import {ITools} from '../interfaces/itools';
import {IPictures} from '../interfaces/ipictures';

const url = 'https://ecommunity-80ee.restdb.io/rest/czasoby';
const options = {
    headers: {
        'cache-control': 'no-cache',
        'x-apikey': '5ad4ec0a25a622ae4d52836f',
        'content-type': 'application/json'
    }
};

@Injectable()
export class ResourcesService {

    private resourcesObs = new BehaviorSubject<Array<ITools>>([]);
    resources$ = this.resourcesObs.asObservable();

    constructor(private http: HttpClient) {
        this.getResources();
    }

    // Pobierz wszystkie zasoby
    getResources() {
        return this.http.get<Array<ITools>>(url + '?q={}&h={"$orderby": {"nazwa": 1}}', options).subscribe(
            res => {
                this.resourcesObs.next(res);
            },
            err => {
                console.log(err);
            }
        );
    }

    // Pobierz zdjęcia
    getPictures(id: string): Observable<Array<IPictures>> {
        return this.http.get<Array<IPictures>>(url + '/' + id + '/zdjecia', options);
    }

    // Wysyłanie zasobu
    public addTools(tools: Tools): Observable<object> {
        console.log(tools);
        return this.http.post(url, tools, options);
    }
}
