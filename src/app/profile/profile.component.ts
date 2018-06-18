import {Component, OnInit, Input} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {IUser} from '../interfaces/iuser';
import {User} from '../model/user';
import {AuthUser} from '../interfaces/authUser';
import {ActivatedRoute} from '@angular/router';
import {RegistrationService} from '../services/registration.service';
import {Location} from '@angular/common';

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
    allowEdit: boolean;

    private id: string;
    private user: string;

    constructor(public authService: AuthService, private route: ActivatedRoute, private registrationService: RegistrationService,
                private location: Location) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            if (this.id == null) {
                this.profileData = JSON.parse(localStorage.getItem('profile'));
                this.allowEdit = true;
                this.profile = JSON.parse(localStorage.getItem('authProfile'));
            } else {
                this.profileData = JSON.parse(localStorage.getItem('profile'));
                if (this.profileData[0]._id !== this.id) {
                    this.allowEdit = this.profileData[0].moderator;
                    this.profileData = [];
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
                } else {
                    this.allowEdit = true;
                    this.profile = JSON.parse(localStorage.getItem('authProfile'));
                }

            }
        });
    }

    goBack() {
        this.location.back();
    }

}


