import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ResourcesService} from '../services/resources.service';
import {Tools} from '../model/tools';
import {Location} from '@angular/common';
import {ITools} from '../interfaces/itools';
import {Observable} from 'rxjs/Observable';
import {RegistrationService} from '../services/registration.service';
import {IUser} from '../interfaces/iuser';


@Component({
    selector: 'app-resources-edit',
    templateUrl: './resources-edit.component.html',
    styleUrls: ['./resources-edit.component.less']
})
export class ResourcesEditComponent implements OnInit {

    Resource$: Observable<Tools>;

    resource = new Tools();
    resources: ITools[];
    resourceCheck = new Tools();
    loaded;
    users: IUser[];
    profileData: IUser[];
    allowEdit: boolean;

    constructor(private route: ActivatedRoute, private resService: ResourcesService, private location: Location,
                private registrationService: RegistrationService, private router: Router) {
    }

    goBack() {
        this.location.back();
    }


    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.allowEdit = false;
        this.profileData = JSON.parse(localStorage.getItem('profile'));

        this.Resource$ = this.resService.getResourceById(id);

        this.resService.getResourceById(id).subscribe(ResData => {
            // console.log(id);
            // console.log(JSON.stringify(ResData));
            this.resource = ResData;
            this.resourceCheck = ResData;
            if (this.resourceCheck.wlasciciel[0]._id === this.profileData[0]._id || this.profileData[0].moderator === true) {
                this.allowEdit = true;
            }
        }, err => {
            console.log(JSON.stringify(err));
        }, () => {
            this.loaded = true;
        });

        this.resService.getResources().subscribe(resourceData => {
            if (!resourceData) {
                return;
            }
            this.resources = resourceData;
        }, err => {
            console.log(JSON.stringify(err));
        });


        this.registrationService.getUsers()
            .subscribe(UserData => {
                if (!UserData) {
                    return;
                }
                this.users = UserData;
                // console.log('Id usera: ' + this.user[0]._id);
            }, err => {
                console.log(JSON.stringify(err));
            });

    }

    onSubmit() {
        this.resService.updateTools(this.resource).subscribe(
            res => {
                console.log(res);
                this.router.navigate(['logged/resources']);
            }, err => {
                console.log(JSON.stringify(err));
            });
    }
}

