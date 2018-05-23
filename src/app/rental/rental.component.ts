import { Component, OnInit } from '@angular/core';
import {VERSION} from '@angular/material';
import {RentalService} from '../services/rental.service';
import {Rental} from '../model/rental';
import {AuthService} from '../services/auth.service';
import {User} from '../model/user';
import {ResourcesService} from '../services/resources.service';
import {Resource} from '../resources/resources.component';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.less']
})
export class RentalComponent implements OnInit {
  selected_resource_id = '';
  allResources: Observable<Array<Resource>>;
  minDate = new Date();
  maxDate = new Date(this.minDate.getUTCFullYear() + 1, this.minDate.getMonth() === 2 && this.minDate.getDay() === 29 ? 3 : this.minDate.getMonth() ,
    this.minDate.getMonth() === 2 && this.minDate.getDay() === 29 ? 1 : this.minDate.getDay());
  startDate = this.minDate;
  endDate = this.minDate;
  version = VERSION;
  godz_od = this.rentalService.stringTime(new Date()) ;
  godz_do = this.godz_od;
  user: User;
  rental: Rental;
  constructor(private rentalService: RentalService, private authService: AuthService, private resourcesService: ResourcesService) { }

  ngOnInit() {
     this.user = JSON.parse(localStorage.getItem('profile'));
     this.rental = this.rentalService.setupNewRental(  this.user[0]._id, null);
     this.allResources = this.resourcesService.resources$;
  }
onSubmit() {
  this.rental.rezerwacja = true;
  this.rental.data_wypozyczenia = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate(),
                                           Number(this.godz_od.substring(0, 2)), Number(this.godz_od.substring(2, 4)  ));
  this.rental.data_zwrotu = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate(),
    Number(this.godz_do.substring(0, 2)), Number(this.godz_do.substring(2, 4)  ));
  this.rental.zasob.push(this.selected_resource_id);
  console.log('Wysylam' , JSON.stringify(this.rental));
  this.rentalService.addRental(this.rental).subscribe(
    res => {
      console.log(res);
      //this.showSuccessMessage = true;
      //this.messageSubmit = 'Dziękujemy za złożenie wniosku o rejestrację. Skontaktujemy się po jego akceptacji.';
      //setTimeout(() => {
      //  this.showSuccessMessage = false;
      //  this.router.navigate(['home']);
      // }, 3000) ;
    },
      err => {
       // this.formSent = false;
        console.log(JSON.stringify(err));
       // this.showErrorMessage = true;
       // this.messageSubmit = 'Nastąpił nieoczekiwany błąd podczas zapisu wniosku.  ' ;
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
onCancel() {

}
}
