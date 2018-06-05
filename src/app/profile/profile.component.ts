import {Component, OnInit, Input} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {IUser} from '../interfaces/iuser';
import {User} from '../model/user';
import {AuthUser} from '../interfaces/authUser';
import {ActivatedRoute} from '@angular/router';
import {RegistrationService} from '../services/registration.service';

const myPicture = {
    picture: '../assets/logo_100x100.png'
};
const myPictureStr = JSON.stringify(myPicture);

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.less']
})

export class ProfileComponent implements OnInit {

    profileData: IUser[];
    profile: AuthUser[];

    private id: string;
    private user: string;

    constructor(public authService: AuthService, private route: ActivatedRoute, private registrationService: RegistrationService) {
    }

    ngOnInit() {

        this.route.params.subscribe(params => {
            this.id = params['id'];
            if (this.id == null) {
                this.profileData = JSON.parse(localStorage.getItem('profile'));
                this.profile = JSON.parse(localStorage.getItem('authProfile'));
            } else {
                this.registrationService.getUserById(this.id)
                    .subscribe(UserData => {
                        if (!UserData) {
                            return;
                        }
                        this.user = '[' + JSON.stringify(UserData) + ']';
                        this.profileData = JSON.parse(this.user);
                        this.profile = JSON.parse(myPictureStr);
                    }, err => {
                        console.log(JSON.stringify(err));
                    });
            }
        });
    }

}


