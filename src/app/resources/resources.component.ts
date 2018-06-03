import {Component, OnInit} from '@angular/core';
import {ResourcesService} from '../services/resources.service';
import {Observable} from 'rxjs/Observable';
import {ITools} from '../interfaces/itools';
import {AuthUser} from '../interfaces/authUser';
import {IUser} from '../interfaces/iuser';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.less']
})
export class ResourcesComponent implements OnInit {

  profileData: IUser = JSON.parse(localStorage.getItem('profile'));
  profile: AuthUser = JSON.parse(localStorage.getItem('authProfile'));
  allResources$: Observable<Array<ITools>>;

  constructor(
    private resService: ResourcesService,
    public authService: AuthService) { }

  getResources() {
    this.allResources$ = this.resService.resources$;

  }

  ngOnInit() {
    this.getResources();
  }

}
