import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../model/user';
import {RegistrationService} from '../services/registration.service';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.less']
})
export class UserDetailsComponent implements OnInit {
user = new User();
czyakcept: boolean ;

  constructor(private route: ActivatedRoute,  private router: Router,  private registrationService: RegistrationService  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.registrationService.getUserById(id).subscribe(UserData => {
      //console.log(JSON.stringify(UserData));
      this.czyakcept = UserData.akceptacja;
      this.user = UserData;
    }, err => {console.log(JSON.stringify(err)); });
  }
onCancel() {
  this.router.navigate(['register-forms']);


}
onSubmit() {
   if (!this.czyakcept && this.user.akceptacja )
   this.user.dataakceptacji = new Date();
  this.registrationService.updateUser(this.user).subscribe(
    res => {
      console.log(res);
        this.router.navigate(['register-forms']);
         },
    err => {
      //this.formSent = false;
      console.log(JSON.stringify(err));
      //this.showErrorMessage = true;
      //this.messageSubmit = 'Nstąpił nieoczekiwany błąd podczas zapisu wniosku.  '; //+ JSON.stringify(err);
      // setTimeout(() => {    //<<<---    using ()=> syntax
      //   this.showMessage = false;
      // }, 3000);
    },
    () => {
      console.log('Operation completed'); // this router navigate
      // () => this._router.navigate(['Home'])
    }
  );
}
}
