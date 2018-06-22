import { Injectable } from '@angular/core';
import {Rental} from '../model/rental';
import { Observable } from 'rxjs/Observable';
import { HttpParams, HttpClient } from '@angular/common/http';
import {User} from '../model/user';


const url = 'https://ecommunity-80ee.restdb.io/rest/cwypozyczenia';

const options = {
  headers:
    {   'cache-control': 'no-cache',
      'x-apikey': '5ad4ec0a25a622ae4d52836f',
      'content-type': 'application/json'
    }
};


@Injectable()
export class RentalService {

  constructor(private http: HttpClient) {
  }
 public getRentals(userId?: string): Observable<Array<Rental>> {
    if ( userId == null  )
      return this.http.get<Array<Rental>>(url  + '?q={}&h={"$orderby": {"data_wypozyczenia": -1}} ' , options);
    else
      return this.http.get<Array<Rental>>(url + '?q={"uzytkownik": {"_id":"' + userId + '"}}&h={"$orderby": {"data_wypozyczenia": -1}} ', options);
  }

  public updateRental(rental: Rental): Observable<any> {
    return this.http.put(url + '/' + rental._id, rental, options);
  }
  public getRentalById(rentalId: string): Observable<Rental> {
      return this.http.get<Rental>(url + '/' + rentalId, options);
  }
  public getRentalsByResourceId(resourceId: string): Observable<Array<Rental>> {
    return this.http.get<Array<Rental>>(url + '?q={"zasob._id": "' + resourceId + '"}&h={"$orderby": {"data_wypozyczenia": -1}} ', options);
  }

  public addRental(rental: Rental): Observable<object>  {
//    console.log(user);
    return this.http.post(url, rental, options);
  }
  checkTime(i: number): string {
    if (i < 10) {
      return  '0' + i.toString();
    }
    return i.toString();
  }

  stringTime(dateNow: Date): string {
    console.log("dateId" + dateNow);
    let h = dateNow.getHours();
    console.log(h);
    let m = dateNow.getMinutes();
    if (m <= 15) {
      m = 15;
    } else {
      if (m <= 30) {
        m = 30;
      } else if (m <= 45) {
        m = 45;
      }
    }
    return this.checkTime(h) + this.checkTime(m);
  }
  setupNewRental(userid: string, zasobid?: string): Rental
  {    console.log('userid', userid);
    let rental = new Rental();
    rental.uzytkownik = new Array<string>();
    rental.uzytkownik.push(userid);
    rental.zasob = new Array<string>();
    rental.anulowana = false;
    if (zasobid != null) {
      rental.zasob.push(zasobid);
    }
    rental.rezerwacja = true;
    rental.data_wypozyczenia = new Date();
    rental.data_zwrotu = new Date();
    return rental;
  }
}
