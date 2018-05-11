import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthGuardsService } from '../services/auth-guard.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.less']
})
export class LoggedComponent implements OnInit {
info: string;
  constructor(public authService: AuthService, private authGuardService: AuthGuardsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['email']) {
        this.info = 'Zaloguj się do ' + params['email'];
      } else {
        this.info = null;
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
