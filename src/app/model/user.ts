import { IUser } from '../interfaces/iuser';

export class User implements IUser {
  constructor(
              public  _id: string = null,
              public nazwa: string = '',
              public imie: string = '',
              public nazwisko: string = '',
              public email: string = '',
              public haslo: string = '',
              public  login: string = '',
              public  telefon: string= '',
              public  ulica: string= '',
              public nrdomu: string= '',
              public wspolnota: boolean= false,
              public data: Date = new Date(),
              public akceptacja: boolean = false,
              public uwagi: string = '',
              public archiwum: boolean = false

  ) {
  }
}
