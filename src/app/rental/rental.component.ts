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
  version = VERSION;
  godz_od = 'option' + this.rentalService.stringTime(new Date()) ;
  godz_do = this.godz_od;
  user: User;
  constructor(private rentalService: RentalService, private authService: AuthService, private resourcesService: ResourcesService) { }
  rental: Rental;
  ngOnInit() {
    // this.user = JSON.parse(localStorage.getItem('profile'));
     this.rental = this.rentalService.setupNewRental( this.user == null ? '5b0071b7a38f51610000079e' : this.user._id);
     this.allResources = this.resourcesService.resources$;
  }
onSubmit() {

}
onCancel() {

}
}
