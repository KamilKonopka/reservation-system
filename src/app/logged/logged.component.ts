import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthGuardsService } from '../services/auth-guard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user';
import { IUser } from '../interfaces/iuser';
import { AuthUser } from '../interfaces/authUser';

@Component ({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.less']
})
export class LoggedComponent implements OnInit {

  profileData: IUser;
  profile: AuthUser;
  info: string;
  loggedMessage = 'Zalogowales sie do systemu!';
  displayLoggedMessage = false;
  timer;

  constructor(
    public authService: AuthService,
    private authGuardService: AuthGuardsService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      if (params['email']) {
        this.info = 'Zaloguj się do ' + params['email'];
      } else {
        this.info = null;
      }
    });
    if (this.authService.userProfile) {
      this.profile = this.authService.userProfile;
     } else {
         this.authService.getProfile((err, profile) => {
         this.profile = profile;
         this.authService.getUserByEmail(this.profile.name).subscribe(userData => {
         this.profileData = userData;
         localStorage.setItem('profile', JSON.stringify(this.profileData));
         });
       });
     }
     this.displayLoggedMessage = true;
     this.timer = setTimeout(() => {
       this.displayLoggedMessage = false;
       this.router.navigate(['/logged/dashboard']);
     }, 3000);
  }

  logout() {
    this.authService.logout();
  }
}

