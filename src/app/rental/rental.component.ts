import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.less']
})
export class RentalComponent implements OnInit {
  minDate = new Date();
  maxDate = new Date(this.minDate.getUTCFullYear() + 1, this.minDate.getMonth() === 2 && this.minDate.getDay() === 29 ? 3 : this.minDate.getMonth() ,
    this.minDate.getMonth() === 2 && this.minDate.getDay() === 29 ? 1 : this.minDate.getDay());
  constructor() { }

  ngOnInit() {
  }

}
