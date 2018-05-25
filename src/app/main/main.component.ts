import { Component, OnInit, DoCheck } from '@angular/core';
import { PreviousRouteService } from '../services/previous-route.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {

  previousUrl: string;
  loggedOut = false;
  loggedOutMessage = 'Zostales poprawnie wylogowany z serwisu';

  constructor(
    private previousRouteService: PreviousRouteService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.previousUrl = this.previousRouteService.getPreviousUrl();
    if (this.previousUrl.includes('/logged') && !this.authService.isAuthenticated()) {
      this.loggedOut = true;
      setTimeout(() => {
        this.loggedOut = false;
      }, 3000);
    } else {
      return false;
    }

  }


}
