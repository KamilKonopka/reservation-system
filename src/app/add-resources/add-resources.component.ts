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
import {FileUploaderService} from '../services/file-uploader.service';
import {Observable} from "rxjs/Observable";

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
  profileData: IUser[];
  profile: AuthUser = JSON.parse(localStorage.getItem('authProfile'));
  fileToUpload: File = null;
  opis_zdj: string;
  loaded;
  selected_user_id = '';
  users: Observable<Array<IUser>>;

  constructor(
    private resourcesService: ResourcesService,
    private router: Router,
    public authService: AuthService,
    private route: ActivatedRoute,
    private registrationService: RegistrationService,
    private location: Location,
    private fileUploaderService: FileUploaderService) {}

  private  setupTools() {
    console.log(this.addform.value.nazwa);
    this.tools.nazwa = this.addform.value.nazwa;
    this.tools.opis = this.addform.value.opis;
    this.tools.data_prod = this.addform.value.data_prod;
    this.tools.producent = this.addform.value.producent;
    this.tools.wlasciciel = this.user;
    this.tools.uwagi = this.addform.value.uwagi;
    this.opis_zdj = this.addform.value.opis_zdj;
  }
  selectedUserChanged = () => {
    this.registrationService.getUserById(this.selected_user_id).subscribe(userData => {
      this.user = userData;
    });
  }
  ngOnInit() {
    this.profileData = JSON.parse(localStorage.getItem('profile'));
    const id = this.route.snapshot.paramMap.get('id');
    this.registrationService.getUserById(id).subscribe(UserData => {
        this.user = UserData;
      });

    this.selected_user_id = this.route.snapshot.paramMap.get('id');
    this.users = this.registrationService.getUsers();
    if (this.selected_user_id) {
      this.selectedUserChanged();
    }
    this.loaded = true;
    this.addform = new FormGroup({
      nazwa: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ]),
      opis: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ]),
      opis_zdj: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
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
        // Validators.minLength(3)
      ]),
    });
    this.modalElement = document.getElementById('myModal');
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  onCancel() {
    this.router.navigate(['logged/resources']);
  }
  onSubmit() {
    this.addformSent = true;
    this.showErrorMessage = false;
    this.showSuccessMessage = false;
    if (this.addform.valid || !this.addform.valid) {
      this.setupTools();
      this.resourcesService.addTools(this.tools).subscribe(
        res => {
          let addedTool: Tools;
          addedTool = JSON.parse(JSON.stringify(res));
          this.showSuccessMessage = true;
          this.fileUploaderService.addPicture(this.fileToUpload, this.opis_zdj, addedTool._id).subscribe(data => {

            console.log(res);
            this.messageSubmit = 'Dziękujemy.';
            setTimeout(() => {
              this.showSuccessMessage = false;
              this.router.navigate(['logged/resources']);
            }, 3000);
          }, err => {
            this.addformSent = false;
            console.log(JSON.stringify(err));
            this.showErrorMessage = true;
            this.messageSubmit = 'Nastąpił nieoczekiwany błąd podczas zapisu zdjęcia.';
            }
          );
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
