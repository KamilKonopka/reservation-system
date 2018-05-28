import {Component, OnInit} from '@angular/core';
import {ResourcesService} from '../services/resources.service';
import {Observable} from 'rxjs/Observable';
import {ITools} from '../interfaces/itools';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.less']
})
export class ResourcesComponent implements OnInit {

  allResources$: Observable<Array<ITools>>;

  constructor(private resService: ResourcesService) {
  }

  getResources() {
    this.allResources$ = this.resService.resources$;

  }

  ngOnInit() {
    this.getResources();
  }

}
