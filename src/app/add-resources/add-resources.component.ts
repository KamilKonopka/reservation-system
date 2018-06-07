import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ResourcesService} from '../services/resources.service';
import {Tools} from '../model/tools';
import {FormGroup, FormControl, Validators, } from '@angular/forms';
import {User} from '../model/user';
import {RegistrationService} from '../services/registration.service';
import { Location } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { IUser } from '../interfaces/iuser';
import { AuthUser } from '../interfaces/authUser';

@Component({
  selector: 'app-add-resources',
  templateUrl: './add-resources.component.html',
  styleUrls: ['./add-resources.component.less']
})
export class AddResourcesComponent implements OnInit {
  tools: Tools = new Tools();
  messageSubmit  = '';
  showErrorMessage = false ;
  showSuccessMessage = false;
  addform: FormGroup;
  addformSent = false;
  modalElement: any;
  user = new User();
  profileData: IUser = JSON.parse(localStorage.getItem('profile'));
  profile: AuthUser = JSON.parse(localStorage.getItem('authProfile'));


  constructor(
    private resourcesService: ResourcesService,
    private router: Router,
    public authService: AuthService,
    private route: ActivatedRoute,
    private registrationService: RegistrationService,
    private location: Location ) { }

  private  setupTools() {
    console.log(this.addform.value.nazwa);
    this.tools.nazwa = this.addform.value.nazwa;
    this.tools.opis = this.addform.value.opis;
    this.tools.data_prod = this.addform.value.data_prod;
    this.tools.producent = this.addform.value.producent;
    this.tools.wlasciciel = this.user;
    this.tools.uwagi = this.addform.value.uwagi;
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.registrationService.getUserById(id).subscribe(UserData => {
        this.user = UserData;
      });
    this.addform = new FormGroup({
      nazwa: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      opis: new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ]),
      data_prod: new FormControl('', [
        Validators.required,
      ]),
      producent: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      uwagi: new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ]),
    });
    this.modalElement = document.getElementById('myModal');
  }
  onCancel() {
    this.router.navigate(['logged/resources']);
  }
  onSubmit() {
    this.addformSent = true;
    this.showErrorMessage = false;
    this.showSuccessMessage = false;
    if (this.addform.valid) {
      this.setupTools();
      this.resourcesService.addTools(this.tools).subscribe(
        res => {
          console.log(res);
          this.showSuccessMessage = true;
          this.messageSubmit = 'Dziękujemy.';
          setTimeout(() => {
            this.showSuccessMessage = false;
            this.router.navigate(['logged/resources']);
          }, 3000) ;
        },
        err => {
          this.addformSent = false;
          console.log(JSON.stringify(err));
          this.showErrorMessage = true;
          this.messageSubmit = 'Nastąpił nieoczekiwany błąd podczas zapisu.';
        },
        () => {
          console.log('Operation completed'); // this router navigate
          // () => this._router.navigate(['Home'])
        }
      );
    } else {
      console.log('Form is invalid :( !!!');
    }
  }

}

