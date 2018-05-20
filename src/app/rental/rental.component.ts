import { Component, OnInit } from '@angular/core';
import {VERSION} from '@angular/material';
import {RentalService} from '../services/rental.service';
import {Rental} from '../model/rental';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.less']
})
export class RentalComponent implements OnInit {
  minDate = new Date();
  maxDate = new Date(this.minDate.getUTCFullYear() + 1, this.minDate.getMonth() === 2 && this.minDate.getDay() === 29 ? 3 : this.minDate.getMonth() ,
    this.minDate.getMonth() === 2 && this.minDate.getDay() === 29 ? 1 : this.minDate.getDay());
  version = VERSION;
  godz_od = 'option' + this.rentalService.stringTime(new Date()) ;
  godz_do = this.godz_od;
  constructor(private rentalService: RentalService, private authService: AuthService) { }
  rental: Rental;
  ngOnInit() {
    //this.rental = this.rentalService.setupNewRental(this.authService.getProfile().)
  }
onSubmit() {

}
onCancel() {

}
}
