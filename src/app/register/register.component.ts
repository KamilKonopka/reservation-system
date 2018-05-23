import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {Router} from '@angular/router';
import {RegistrationService} from '../services/registration.service';
import {User} from '../model/user';
import {IUser} from '../interfaces/iuser';

import {
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
  FormBuilder
} from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterFormComponent  implements OnInit {
  user: User = new User();
  messageSubmit  = '';
  showErrorMessage = false ;
  showSuccessMessage = false;
  myform: FormGroup;
  formSent = false;
  modalElement: any;
  ulice: string[] = [
    'Kościuszki',
    'Pomorska',
    'Nowatorów',
  ];
  constructor (private registrationService: RegistrationService, private  router: Router) { }
  private  setupUser() {
    console.log(this.myform.value.ulica);
    this.user.ulica = this.myform.value.ulica;
  this.user.email  = this.myform.value.email;
  // this.myname = this.myform.controls.name.value;
  this.user.imie = this.myform.value.firstName;
  this.user.name = this.myform.value.lastName;
  this.user.nrdomu = this.myform.value.nrdomu;
  this.user.telefon = this.myform.value.phoneNo;
  this.user.haslo = this.myform.value.password;
  this.user.nickname = this.myform.value.login;
  this.user.datawniosku = new Date();
  this.user.archiwum = false;
  this.user.akceptacja = false;
  }
  private userNameTelLoginExists( userArr, usrToAdd: IUser): string {
    if (userArr == null) {
      return '';
    }
   for (let i = 0; i < userArr.length; i++) {
      if (userArr[i].nickname.toLocaleLowerCase() === usrToAdd.nickname.toLocaleLowerCase()) {
        console.log(userArr[i].nickname);
        return 'Nazwa użytkownika jest już w użyciu';
      }
      if (userArr[i].email.toLocaleLowerCase() === usrToAdd.email.toLocaleLowerCase()) {
        return 'Adres email jest już użyty';
      }
      if (userArr[i].telefon.toLocaleLowerCase() === usrToAdd.telefon.toLocaleLowerCase()) {
        return 'Podany telefon został już użyty';
      }
    }
    return '';
}

    ngOnInit() {
    this.myform = new FormGroup({
    firstName: new FormControl('', [
    Validators.required
    ]),
    lastName: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[^ @]*@[^ @]*')
      ]),
      phoneNo: new FormControl('', [
        Validators.required,
        Validators.pattern('(?<!\\w)(\\(?(\\+|00)?48\\)?)?[ -]?\\d{3}[ -]?\\d{3}[ -]?\\d{3}(?!\\w)')
      ]),
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      repassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      ulica: new FormControl(),
      nrdomu: new FormControl(),
      agree: new FormControl()
  });
    // this.myform.controls.email.setValue('aaa@wp.pl');
      this.modalElement = document.getElementById('myModal');
    }
onCancel() {
 this.router.navigate(['home']);
}
  onSubmit() {
    this.formSent = true;
    this.showErrorMessage = false;
    this.showSuccessMessage = false;
    if (this.myform.valid) {
      console.log('Form is valid  :) !!!');
      this.setupUser();
      // sprawdź czy nie ma takiego usera
this.registrationService.getActiveUsers().subscribe(
  userLst => {
  this.messageSubmit = this.userNameTelLoginExists(userLst, this.user);
  if (this.messageSubmit != null && this.messageSubmit.length > 0 ) {
    this.formSent = false;
    this.showErrorMessage = true;
    return;
  }
    this.registrationService.addUser(this.user).subscribe(
      res => {
        console.log(res);
        this.showSuccessMessage = true;
        this.messageSubmit = 'Dziękujemy za złożenie wniosku o rejestrację. Skontaktujemy się po jego akceptacji.';
        setTimeout(() => {
          this.showSuccessMessage = false;
          this.router.navigate(['home']);
        }, 3000) ;
      },
      err => {
        this.formSent = false;
        console.log(JSON.stringify(err));
        this.showErrorMessage = true;
        this.messageSubmit = 'Nastąpił nieoczekiwany błąd podczas zapisu wniosku.  ' ;
        // setTimeout(() => {    //<<<---    using ()=> syntax
        //   this.showMessage = false;
        // }, 3000);
      },
      () => {
        console.log('Operation completed'); // this router navigate
        // () => this._router.navigate(['Home'])
      }

    );
  },
  err => {
    this.formSent = false;
    console.log(JSON.stringify(err));
    this.showErrorMessage = true;
    this.messageSubmit = 'Nastąpił nieoczekiwany błąd podczas walidacji wniosku.  ' ;
    // setTimeout(() => {    //<<<---    using ()=> syntax
    //   this.showMessage = false;
    // }, 3000);
  }
);
    } else {
      console.log('Form is invalid :( !!!');
      this.getFormValidationErrors();
    }
  }

// display all form errors
  getFormValidationErrors() {
    Object.keys(this.myform.controls).forEach(key => {

      const controlErrors: ValidationErrors = this.myform.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }
}
