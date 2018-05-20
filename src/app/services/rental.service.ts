import { Injectable } from '@angular/core';
import {Rental} from '../model/rental';

@Injectable()
export class RentalService {

  constructor() { }
  checkTime(i: number): string {
    if (i < 10) {
      return  '0' + i.toString();
    }
    return i.toString();
  }

  stringTime(dateNow: Date): string {

    let h = dateNow.getHours();
    let m = dateNow.getMinutes();
    if (m < 15) {
      m = 15;
    } else {
      if (m < 30) {
        m = 30;
      } else if (m < 45) {
        m = 45;
      }
    }
    return this.checkTime(h) + this.checkTime(m);
  }
  setupNewRental(userid: string, zasobid?: string): Rental
  {
    const rental = new Rental();
    rental.cuzytkownicy = new Array<string>();
    rental.cuzytkownicy.push(userid);
    if (zasobid != null) {
      rental.czasoby = new Array<string>();
      rental.czasoby.push(zasobid);
    }
    rental.rezerwacja = true;
    rental.data_wypozyczenia = new Date();
    rental.data_zwrotu = new Date();
    return rental;
  }
}
