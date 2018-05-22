import { IUser } from '../interfaces/iuser';

export class User implements IUser {
  constructor(
              public  _id: string = null,
              public nickname: string = '',
              public imie: string = '',
              public name: string = '',
              public email: string = '',
              public haslo: string = '',
              public login: string = '',
              public telefon: string= '',
              public ulica: string= '',
              public nrdomu: string= '',
              public wspolnota: boolean= false,
              public datawniosku: Date = null,
              public dataakceptacji: Date = null,
              public akceptacja: boolean = false,
              public uwagi: string = '',
              public archiwum: boolean = false,
              public user_id: number = 0,
              public moderator: boolean

  ) {
  }
}
