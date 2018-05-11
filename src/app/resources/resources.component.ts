import {Component, OnInit} from '@angular/core';
import {ResourcesService} from '../services/resources.service';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-resources',
    templateUrl: './resources.component.html',
    styleUrls: ['./resources.component.less']
})
export class ResourcesComponent implements OnInit {

    allResources$: Observable<Array<Resource>>;

    constructor(private resService: ResourcesService) {
    }

    getResources() {
        this.allResources$ = this.resService.resources$;

    }

    ngOnInit() {
        this.getResources();
    }

}

export interface Resource {
    _id: string;
    nazwa: string;
    opis: string;
    data_prod: string;
    producent: object;
    wlasciciel: object;
    uwagi: string;
}
