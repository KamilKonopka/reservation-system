import { IUser } from '../interfaces/iuser';

export class User implements IUser {
              public  _id: string;
              public nickname: string;
              public imie: string;
              public name: string;
              public email: string;
              public haslo: string;
              public login: string;
              public telefon: string;
              public ulica: string;
              public nrdomu: string;
              public wspolnota: boolean;
              public datawniosku: Date;
              public dataakceptacji: Date;
              public akceptacja: boolean;
              public uwagi: string;
              public archiwum: boolean;
              public user_id: number;
              public moderator: boolean;
}
